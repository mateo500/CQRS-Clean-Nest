import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ example: '5f690bf84b3a6d0590b5940b' })
  _id: string;

  @ApiProperty({ example: 'William' })
  nombre: string;

  @ApiProperty({ example: '1234test' })
  clave: string;

  @ApiProperty({ example: 'admin, premium, iniciante, casual' })
  roles: string[];

  @ApiProperty({ example: "[{mes: 'diciembre'}]" })
  ingresos: {
    mes: number;
    dia: number;
    year: number;
    fechaCompleta: string;
  }[];

  @ApiProperty({ example: '[{valor: 35.500}]' })
  pagos: {
    valor: number;
    numeroDeEntradas: number;
    mes: number;
    fechaCompleta: string | Date;
    tipoMembresia: string;
  }[];

  @ApiProperty({ example: 'true | false' })
  activo: boolean;

  @ApiProperty({ example: '10' })
  entradasRestantes: number;

  @ApiProperty({ type: Date })
  createdAt: string | Date;

  @ApiProperty({ type: Date })
  updatedAt: string | Date;
}
