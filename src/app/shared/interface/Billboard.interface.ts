import { Movie } from "./Movie.interface";
import { Room } from "./Room.interface";

export interface Billboard {
    id?:    number;
    movie: Movie;
    sala:  Room;
    time:  string;
}
