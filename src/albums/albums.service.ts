import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Band } from 'src/bands/entities/band.entity';
import { Song } from 'src/songs/entities/song.entity';
import { DbOperationException } from 'src/exceptions/db_operation.exception';

@Injectable()
export class AlbumsService {
  constructor (
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,

    @InjectRepository(Band)
    private readonly bandsRepository: Repository<Band>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const band = await this.bandsRepository.findOneBy({ id: createAlbumDto.bandId });

    if (!band) {
      throw new NotFoundException('Band doesn\'t exist');
    }

    try {
      const album = await this.albumsRepository.save({ 
        title: createAlbumDto.title,
        description: createAlbumDto.description,
        band,
        songs: [],
       });
      return album;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: number) {
    const album = await this.albumsRepository.findOne({ where: {id}, relations: { band: true, songs: true } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const band = await this.bandsRepository.findOneBy({ id: updateAlbumDto.bandId });

    if (!band) {
      throw new NotFoundException('Band doesn\'t exist');
    }

    updateAlbumDto.title ? album.title = updateAlbumDto.title : album.title = album.title;
    updateAlbumDto.description ? album.description = updateAlbumDto.description : album.description = album.description;
    updateAlbumDto.bandId ? album.band = band : album.band = album.band;

    const songs = updateAlbumDto.songs.map((createSongDto) => new Song(createSongDto));
    album.songs = songs;

    try {
      await this.albumsRepository.save(album);
      return album;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async remove(id: number) {
    const band = await this.albumsRepository.findOneBy({ id });

    if (!band) {
      throw new NotFoundException('Album not found');
    }

    try {
      await this.albumsRepository.remove(band);
      return band;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
}
