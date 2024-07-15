import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Band } from './entities/band.entity';
import { Album } from 'src/albums/entities/album.entity';
import { DbOperationException } from 'src/exceptions/db_operation.exception';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandsRepository: Repository<Band>,
  ) {}

  async create(createBandDto: CreateBandDto) {
    try {
      const newBand = await this.bandsRepository.create({ ...createBandDto, albums: [] });
      await this.bandsRepository.save(newBand);
      return newBand;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
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

  async findByQuery(query: string) {
    return this.bandsRepository.find({ where: { name: Like(`%${query}%`) } });
  }

  async update(id: number, updateBandDto: UpdateBandDto) {
    const band = await this.bandsRepository.findOneBy({ id });

    if (!band) {
      throw new NotFoundException('Band not found');
    }
    
    try {
      await this.bandsRepository.update(id, updateBandDto);
      return { id, ...updateBandDto };
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async remove(id: number) {
    const band = await this.bandsRepository.findOneBy({ id });

    if (!band) {
      throw new NotFoundException('Band not found');
    }

    try {
      await this.bandsRepository.remove(band);
      return band;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
}
