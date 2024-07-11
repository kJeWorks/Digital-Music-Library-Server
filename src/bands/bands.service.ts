import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Band } from './entities/band.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandsRepository: Repository<Band>,
  ) {}

  async create(createBandDto: CreateBandDto) {
    const band = this.bandsRepository.save({ ...createBandDto, albums: [] });
    return band;
  }

  async findAll() {
    return this.bandsRepository.find();
  }

  async findOne(id: number) {
    const band = await this.bandsRepository.findOne({ where: { id }, relations: { albums: true } });

    if (!band) {
      throw new NotFoundException('Band not found');
    }

    return band;
  }

  async update(id: number, updateBandDto: UpdateBandDto) {
    const band = await this.bandsRepository.findOneBy({ id });

    if (!band) {
      throw new NotFoundException('Band not found');
    }

    band.name = updateBandDto.name;
    const albums = updateBandDto.albums.map((createAlbumDto) => new Album(createAlbumDto));
    band.albums = albums;
    
    await this.bandsRepository.save(band);
    return band;
  }

  async remove(id: number) {
    const band = await this.bandsRepository.findOneBy({ id });

    if (!band) {
      throw new NotFoundException('Band not found');
    }

    await this.bandsRepository.remove(band);
    return band;
  }
}
