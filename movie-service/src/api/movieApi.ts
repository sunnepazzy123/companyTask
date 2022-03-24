import { IOmdbResponse } from "../interfaces";
import { Axios } from "./axios-setup";

export const getBySearch = async (title_name: string)=> {
    const { data } = await Axios.get<IOmdbResponse>(`/?t=${title_name}&apiKey=${process.env.API_KEY}`);
    if(data.Error) return null;
    return  { 
        released: data.Released,
        title: data.Title,
        genre: data.Genre,
        director: data.Director
    };
}