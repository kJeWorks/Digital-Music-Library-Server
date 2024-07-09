import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BandsModule } from './bands/bands.module';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [BandsModule, AlbumsModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
