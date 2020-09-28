import { Schema } from 'mongoose';

export const SalaSchema = new Schema(
  {
    nombreSala: {
      type: String,
      required: true,
    },

    descripcion: String,

    rolesAutorizados: [String],

    diasDisponible: [String],

    estado: String,
  },
  { timestamps: true },
);
