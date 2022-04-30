import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export interface IMovie {
    title: string,
    released: Date,
    genre: string,
    director: string,
    user_id: number,
}

interface IPaginate {
    doc: IMovieDoc[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface IMovieModel extends mongoose.Model<IMovieDoc> {
    paginate(arr: {}, arr2: any): IPaginate;
}


export interface IMovieDoc extends mongoose.Document {
    createdAt?: Date
}


const moviesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,       
        },
        released: {
            type: Date,
            required: true,     
        },
        genre: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true,
        },
        user_id: {
            type: Number,
            required: true,
            ref: 'users'
        },
    },
    {
        toJSON: {
            transform(docs, ret){
                delete ret.__v;
                delete ret._id;
                delete ret.updatedAt;
                delete ret.createdAt;
            }
        },
        timestamps: true,
    }
);

moviesSchema.plugin(mongoosePaginate);
const MoviesModel = mongoose.model<IMovieDoc, IMovieModel>('movies', moviesSchema);

export default MoviesModel;
