import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';
import { Band } from './entities/band.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Band])],
  controllers: [BandsController],
  providers: [BandsService],
})
export class BandsModule {}
