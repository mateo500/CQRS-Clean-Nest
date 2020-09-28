import { IsNotEmptyObject, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarMembresia {
  @IsNotEmptyObject()
  @IsObject()
  @ApiProperty({
    example: '{pago: {tipoMembresia: "premium"}}',
  })
  public pago: {
    tipoMembresia: string;
  };
}
