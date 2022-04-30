import MoviesModel, { IMovie } from "../../model/movieModel";


export const get = async (user_id: number) => {
    return await MoviesModel.find({}).where({user_id});
}

export const getId = async (_id: string) => {
    return await MoviesModel.findById({_id});
}

export const getOne = async (movie: Partial<IMovie>) => {
    return await MoviesModel.findOne({}).where(movie);
}

export const create = async (movie: IMovie) => {
    return await MoviesModel.create(movie);
}