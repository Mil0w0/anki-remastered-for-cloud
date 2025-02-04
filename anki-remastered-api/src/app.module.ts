import { Module } from '@nestjs/common';
import { CardModule } from './cards/card.module';

@Module({
  imports: [CardModule],
})
export class AppModule {}