import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, transform: true })) createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      return this.songsService.findByQuery(query);
    }
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ whitelist: true, transform: true })) updateSongDto: UpdateSongDto) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.remove(id);
  }
}
