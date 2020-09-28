import { ApiProperty } from '@nestjs/swagger';

export class SalaDto {
  @ApiProperty({ example: '5f690bf84b3a6d0590b5940b' })
  _id: string;

  @ApiProperty({ example: 'Sala Pilates' })
  nombreSala: string;

  @ApiProperty({ example: 'sala para practicar pilates' })
  descripcion: string;

  @ApiProperty({ example: '["admin", "premium"]' })
  rolesAutorizados: string[];

  @ApiProperty({ example: '[lunes, martes, miercoles]' })
  diasDisponible: string[];

  @ApiProperty({ example: 'disponible | no-disponible' })
  estado: string;

  @ApiProperty({ type: Date })
  createdAt: string;

  @ApiProperty({ type: Date })
  updatedAt: string;
}
