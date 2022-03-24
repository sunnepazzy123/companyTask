import axios from "axios";
import { Request, Response } from "express"
import { OmdpApi } from "../api";
import { AuthError } from "../error/authError";
import MoviesModel from "../model/movieModel";
import { date_diff_indays } from "../utils/date_differences";


const AUTH_SERVICE = process.env.AUTH_SERVICE || 'http://localhost:8888/api/auth';


export const get = async(req: Request, res: Response)=>{
    const options = {
             page: +req.query.page || 1,
             limit: +req.query.limit || 10,
         };
    const movies = await MoviesModel.paginate({}, options);
    return res.status(200).json(movies);
}

export const getId = async(req: Request, res: Response)=>{
    const id = +req.params.id  
    const movie = await MoviesModel.find({id});
    return res.status(200).json(movie);
}

export const create = async(req: Request, res: Response)=>{
    const { title } = req.body;
    const user_id = req.user.userId;
    const result = await OmdpApi.getBySearch(title);
    if(!result) throw new AuthError('Movie not found');
    const movieFound = await (await MoviesModel.findOne({ title: result.title}));
    if(movieFound) throw new AuthError('Movie already exist');

    if(req.user.role === "premium" && result){
        const movie = {...result, user_id};
       const newMovie = await MoviesModel.create(movie)
       return res.status(200).json(newMovie)
    }
    const lastMovie = await MoviesModel.find({id: user_id}).sort({_id: -1}).limit(1);

    if(lastMovie.length > 0){
        const days_differences = date_diff_indays(lastMovie[0].createdAt, new Date);
        const subscription = await (await axios.get(`${AUTH_SERVICE}/subscription/${user_id}`)).data;

        if(subscription?.limit === 5 && days_differences < 30){
            throw new AuthError('Limit exceeded');
        }
        if(days_differences >= 30){
            await axios.put(`${AUTH_SERVICE}/subscription/${user_id}`, {limit: 0});     
        }

    }

    const movie = {...result, user_id};
    const newMovie = await MoviesModel.create(movie);
    await axios.put(`${AUTH_SERVICE}/subscription/${user_id}`, {limit: 1});
    return res.status(200).json(newMovie);
}