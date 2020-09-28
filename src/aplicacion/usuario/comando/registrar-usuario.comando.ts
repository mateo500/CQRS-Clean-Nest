import { IsString, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarUsuario {
  @IsString()
  @ApiProperty({ example: 'William' })
  public nombre: string;

  @IsString()
  @ApiProperty({ minLength: 4, example: '1234' })
  public clave: string;

  @IsArray()
  @ApiProperty({ example: '[admin, premium, iniciante, casual]' })
  public roles: string[];

  @IsArray()
  @ApiProperty({ example: '[]' })
  public ingresos: {
    mes: number;
    dia: number;
    year: number;
    fechaCompleta: string;
  }[];

  @IsArray()
  @ApiProperty({ example: '[]' })
  public pagos: {
    valor: number;
    numeroDeEntradas: number;
    mes: number;
    fechaCompleta: string | Date;
    tipoMembresia: string;
  }[];

  @IsBoolean()
  @ApiProperty({ example: 'true | false' })
  public activo: boolean;

  @IsNumber()
  @ApiProperty({ example: '10' })
  public entradasRestantes: number;
}
