import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBandDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
