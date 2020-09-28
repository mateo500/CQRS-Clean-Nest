import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoLoginUsuario {
  @IsString()
  @ApiProperty({ example: 'William' })
  public nombre: string;

  @IsString()
  @ApiProperty({ minLength: 4, example: '1234test' })
  public clave: string;
}
