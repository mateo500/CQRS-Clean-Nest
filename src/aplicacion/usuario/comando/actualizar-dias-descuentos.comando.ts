import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarDiasDeDescuentos {
  @IsArray()
  @ApiProperty({ example: '["lunes", "martes", "miercoles" ]' })
  public diasDeDescuento: string[];
}
