import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Album } from 'src/albums/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Song])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
