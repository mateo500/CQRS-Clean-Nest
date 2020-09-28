import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  clave: string;
  roles: string[];
  ingresos: {
    mes: number;
    dia: number;
    year: number;
    fechaCompleta: string;
  }[];
  pagos: {
    valor: number;
    numeroDeEntradas: number;
    dia: number;
    mes: number;
    year: number;
    fechaCompleta: string | Date;
    tipoMembresia: string;
  }[];
  entradasRestantes: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
