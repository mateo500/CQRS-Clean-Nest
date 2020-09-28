import { Document } from 'mongoose';

export interface ISala extends Document {
  nombreSala: string;
  descripcion: string;
  rolesAutorizados: string[];
  diasDisponible: string[];
  estado: string;
  createdAt: string;
  updatedAt: string;
}
