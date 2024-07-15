import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, transform: true })) createBandDto: CreateBandDto) {
    return this.bandsService.create(createBandDto);
  }

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      return this.bandsService.findByQuery(query);
    }
    return this.bandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bandsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ whitelist: true, transform: true })) updateBandDto: UpdateBandDto) {
    return this.bandsService.update(id, updateBandDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bandsService.remove(id);
  }
}
