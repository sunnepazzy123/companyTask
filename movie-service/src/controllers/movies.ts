import axios from "axios";
import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { Orm } from ".";
import { OmdpApi } from "../api";
import { authComponent as component } from "../mediator/setup";
import { DatabaseError } from "../error/databaseError";
import { ISubscriber } from "../interfaces/ISubscriber";
import MoviesModel, { IMovie } from "../model/movieModel";
import { date_diff_indays } from "../utils/date_differences";


const AUTH_SERVICE = process.env.AUTH_SERVICE || 'http://localhost:8888';


export const get = async (req: Request, res: Response) => {
    const user_id = +req.user.userId;
    const movies = await Orm.Movies.get(user_id);
    component.notify({ type: "get", data: movies })
    return res.status(200).json(movies);
}

export const getId = async (req: Request, res: Response) => {
    const _id = req.params.id
    const movie = await Orm.Movies.getId(_id);

    return res.status(200).json(movie);
}

export const create = async (req: Request, res: Response) => {
    const title = req.body.title as string;
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const user_id = req.user.userId;
    const result = await OmdpApi.getBySearch(title);
    const movieFound = await Orm.Movies.getOne({ title: result.title });

    if (movieFound) throw new DatabaseError('Movie already exist', 400);

    let movie: IMovie
    if (req.user.role === "premium") {
        movie = { ...result, user_id };
        const newMovie = await Orm.Movies.create(movie);
        component.notify({ type: "create", data: newMovie })
        return res.status(200).json(newMovie)
    }
    const lastMovie = await MoviesModel.find({ user_id }).sort({ _id: -1 }).limit(1);

    if (lastMovie.length > 0) {
        const days_differences = date_diff_indays(lastMovie[0].createdAt, new Date);
        const subscription = await (await axios.get(`${AUTH_SERVICE}/api/auth/subscription/${user_id}`)).data as ISubscriber;

        if (!subscription) throw new DatabaseError('Unathorized User', 400);

        if (subscription.limit >= 5 && days_differences < 30) {
            throw new DatabaseError('Limit exceeded', 400);
        }
        if (days_differences >= 30) {
            await axios.put(`${AUTH_SERVICE}/api/auth/subscription/${user_id}`, { limit: 0 });
        }

    }

    movie = { ...result, user_id };
    const newMovie = await Orm.Movies.create(movie);
    component.notify({ type: "create", data: newMovie })
    await axios.put(`${AUTH_SERVICE}/api/auth/subscription/${user_id}`, { limit: 1 });
    return res.status(200).json(newMovie);
}