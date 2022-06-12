import { Persona } from "./persona";

export class Pasaje {
    
    _id!: string;
    categoriaPasajero!: string;
    fechaCompra!: string;
    pasajero!: Persona;
    precioPasaje!: number;

    constructor(){}
}
