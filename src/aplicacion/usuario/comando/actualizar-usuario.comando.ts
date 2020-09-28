import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarUsuario {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'William' })
  public nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ minLength: 4, example: '1234' })
  public clave: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: 'admin, premium, iniciante, casual' })
  public roles: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: 'true | false' })
  public activo: boolean;
}
