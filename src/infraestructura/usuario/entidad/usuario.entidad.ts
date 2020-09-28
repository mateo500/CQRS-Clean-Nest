import { Schema } from 'mongoose';
import { IUsuario } from './usuario.entidad.types';

export const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    clave: {
      type: String,
      required: true,
    },

    roles: [],

    ingresos: [
      { mes: Number, dia: Number, year: Number, fechaCompleta: String },
    ],

    pagos: [
      {
        valor: Number,
        numeroDeEntradas: Number,
        dia: Number,
        mes: Number,
        year: Number,
        fechaCompleta: String,
        tipoMembresia: String,
      },
    ],

    activo: Boolean,

    entradasRestantes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

UsuarioSchema.pre<IUsuario>('init', async function(this: IUsuario) {
  await this.model('Usuario');
  const entradasRestantes = await this.get('entradasRestantes');
  const roles = await this.get('roles');

  if (entradasRestantes <= 0 && !roles.includes('admin')) {
    await this.set('activo', false);
    await this.set('roles', []);
    await this.save();
  }
});
