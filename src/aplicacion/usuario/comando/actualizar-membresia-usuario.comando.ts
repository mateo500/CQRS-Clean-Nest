import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarMembresia {
  @IsString()
  @ApiProperty({
    example: 'tipoMembresia: "premium"',
  })
  tipoMembresia: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 'pago?: number' })
  valor?: number;
}
