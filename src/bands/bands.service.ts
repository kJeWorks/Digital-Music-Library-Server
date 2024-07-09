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
    return 'This action adds a new band';
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
    return `This action updates a #${id} band`;
  }

  async remove(id: number) {
    return `This action removes a #${id} band`;
  }
}
