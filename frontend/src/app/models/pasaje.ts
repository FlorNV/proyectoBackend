import { Persona } from "./persona";

export class Pasaje {
    
    _id!: string;
    categoriaPasajero!: string;
    fechaCompra!: Date;
    pasajero!: Persona;
    precioPasaje!: number;

    constructor(){}
}
