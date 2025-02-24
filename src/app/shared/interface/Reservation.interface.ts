import { Billboard } from "./Billboard.interface";

export interface Reservation {
    id:          number;
    reservator:  Reservator;
    reservation: Billboard;
    seat:        number;
}

export interface Reservator {
    id:       number;
    email:    string;
    password: string;
    rol:      string[];
}


export interface RequestReservation {
    reservator?:  string;
    reservation: number;
    seat:        number;
}