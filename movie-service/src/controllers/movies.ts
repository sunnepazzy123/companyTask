import axios from "axios";
import { Request, Response } from "express"
import { OmdpApi } from "../api";
import { DatabaseError } from "../error/databaseError";
import { ISubscriber } from "../interfaces/ISubscriber";
import MoviesModel, { IMovie } from "../model/movieModel";
import { date_diff_indays } from "../utils/date_differences";


const AUTH_SERVICE = process.env.AUTH_SERVICE || 'http://localhost:8888/api/auth';


export const get = async(req: Request, res: Response)=>{
    const movies = await MoviesModel.find({user_id: req.user.userId});
    return res.status(200).json(movies);
}

export const getId = async(req: Request, res: Response)=>{
    const id = +req.params.id  
    const movie = await MoviesModel.find({id});
    return res.status(200).json(movie);
}

export const create = async(req: Request, res: Response)=>{
    const title  = req.body.title as string;
    const user_id = req.user.userId;
    const result = await OmdpApi.getBySearch(title);
    const movieFound = await (await MoviesModel.findOne({ title: result.title}));
    if(movieFound) throw new DatabaseError('Movie already exist', 400);

    let movie: IMovie
    if(req.user.role === "premium" && result){
       movie = {...result, user_id};
       const newMovie = await MoviesModel.create(movie)
       return res.status(200).json(newMovie)
    }
    const lastMovie = await MoviesModel.find({id: user_id}).sort({_id: -1}).limit(1);

    if(lastMovie.length > 0){
        const days_differences = date_diff_indays(lastMovie[0].createdAt, new Date);
        const subscription = await (await axios.get(`${AUTH_SERVICE}/subscription/${user_id}`)).data as ISubscriber;

        if(subscription.limit === 5 && days_differences < 30){
            throw new DatabaseError('Limit exceeded', 400);
        }
        if(days_differences >= 30){
            await axios.put(`${AUTH_SERVICE}/subscription/${user_id}`, {limit: 0});     
        }

    }

    movie = {...result, user_id};
    const newMovie = await MoviesModel.create(movie);
    await axios.put(`${AUTH_SERVICE}/subscription/${user_id}`, {limit: 1});
    return res.status(200).json(newMovie);
}