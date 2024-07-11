import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createBandDto: CreateBandDto) {
    return this.bandsService.create(createBandDto);
  }

  @Get()
  async findAll() {
    return this.bandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bandsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBandDto: UpdateBandDto) {
    return this.bandsService.update(id, updateBandDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bandsService.remove(id);
  }
}
