import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { OutAlbumDto, OutAlbumSimpleDto } from './dto/out-album.dto';
import { plainToInstance } from 'class-transformer';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, transform: true })) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      const albums = await this.albumsService.findByQuery(query);
      return plainToInstance(OutAlbumSimpleDto, albums);
    }

    const albums = await this.albumsService.findAll();
    return plainToInstance(OutAlbumSimpleDto, albums);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const album = await this.albumsService.findOne(id); 
    return plainToInstance(OutAlbumDto, album);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ whitelist: true, transform: true })) updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.albumsService.remove(+id);
  }
}
