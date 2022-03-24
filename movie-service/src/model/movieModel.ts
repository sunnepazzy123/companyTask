import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

interface IPaginate {
    doc: IMovieDoc[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

interface IMovieModel extends mongoose.Model<IMovieDoc, IPaginate> {
    paginate(arr: {}, arr2: any): IPaginate;
}

export interface IMovieDoc extends mongoose.Document {
    title: string,
    released: Date,
    genre: string,
    director: string,
    user_id: string,
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
