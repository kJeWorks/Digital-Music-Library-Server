import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Like, Repository } from 'typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { DbOperationException } from 'src/exceptions/db_operation.exception';

@Injectable()
export class SongsService {
  constructor (
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,

    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const album = await this.albumsRepository.findOneBy({ id: createSongDto.albumId });

    if (!album) {
      throw new NotFoundException('Album doesn\'t exist');
    }

    try {
      const song = await this.songsRepository.save({ 
        title: createSongDto.title,
        length: createSongDto.length,
        album,
       });
      return song;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async findAll() {
    return this.songsRepository.find();
  }

  async findOne(id: number) {
    const song = await this.songsRepository.findOne({ where: {id}, relations: { album: true } });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    return song;
  }

  async findByQuery(query: string) {
    return this.songsRepository.find({ where: [{ title: Like(`%${query}%`) }, { length: Like(`%${query}%`) }] });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const album = await this.albumsRepository.findOneBy({ id: updateSongDto.albumId });

    if (!album) {
      throw new NotFoundException('Album doesn\'t exist');
    }

    updateSongDto.title ? song.title = updateSongDto.title : song.title = song.title;
    updateSongDto.length ? song.length = updateSongDto.length : song.length = song.length;
    updateSongDto.albumId ? song.album = album : song.album = song.album;

    try {
      await this.songsRepository.save(song);
      return song;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async remove(id: number) {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    try {
      await this.songsRepository.remove(song);
      return song;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
}
