export interface allLoki {
    loki: Loki[];
}
export interface Loki {
    _id: Id;
    nombre: string;
    alias: string[];
    especie: string;
    genero: string;
    origen: string;
    poderes: string[];
    afiliaciones: string[];
    apariciones: string[];
    descripcion: string;
    imagen: string;
  }
  
  export interface Id {
    '$oid': string;
  }