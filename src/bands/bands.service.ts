import { Injectable } from '@nestjs/common';
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
  create(createBandDto: CreateBandDto) {
    return 'This action adds a new band';
  }

  async findAll() {
    return this.bandsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} band`;
  }

  update(id: number, updateBandDto: UpdateBandDto) {
    return `This action updates a #${id} band`;
  }

  remove(id: number) {
    return `This action removes a #${id} band`;
  }
}
