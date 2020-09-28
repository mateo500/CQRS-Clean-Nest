import { Module } from '@nestjs/common';
import { InfraestructuraModule } from './infraestructura/infraestructura.module';

@Module({
  imports: [InfraestructuraModule],
})
export class AppModule {}
