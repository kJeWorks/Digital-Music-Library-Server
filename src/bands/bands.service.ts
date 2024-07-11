import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Band } from './entities/band.entity';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandsRepository: Repository<Band>,
  ) {}

  async create(createBandDto: CreateBandDto) {
    const band = this.bandsRepository.save(createBandDto);
    return band;
  }

  async findAll() {
    return this.bandsRepository.find();
  }

  async findOne(id: number) {
    const band = await this.bandsRepository.findOneBy({ id });

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
