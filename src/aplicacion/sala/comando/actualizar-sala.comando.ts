import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ComandoActualizarSala {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'William' })
  public nombreSala: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Sala Pilates' })
  public descripcion: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: "['admin', 'premium']" })
  public rolesAutorizados: string[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: "['lunes', 'martes', 'miercoles']" })
  public diasDisponible: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'disponible | no-disponible' })
  public estado: string;
}
