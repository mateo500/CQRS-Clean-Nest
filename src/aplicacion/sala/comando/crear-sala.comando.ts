import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCrearSala {
  @IsString()
  @ApiProperty({ example: 'William' })
  public nombreSala: string;

  @IsString()
  @ApiProperty({ example: 'Sala Pilates' })
  public descripcion: string;

  @IsArray()
  @ApiProperty({ example: "['admin', 'premium']" })
  public rolesAutorizados: string[];

  @IsArray()
  @ApiProperty({ example: "['lunes', 'martes', 'miercoles']" })
  public diasDisponible: string[];

  @IsString()
  @ApiProperty({ example: 'disponible | no-disponible' })
  public estado: string;
}
