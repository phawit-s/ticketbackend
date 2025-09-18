import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Priority, Status } from '../../enum/ticket.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'title' })
  @MinLength(5, { message: 'title must be at least 5 characters' })
  @IsString()
  title: string;

  @IsOptional()
  @ApiProperty({ example: 'description', required: false })
  @MaxLength(5000, { message: 'description must be <= 5000 characters' })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'OPEN', enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'] })
  @IsEnum(['OPEN', 'IN_PROGRESS', 'RESOLVED'])
  status: Status;

  @ApiProperty({ example: 'LOW', enum: ['LOW', 'MEDIUM', 'HIGH'] })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority: Priority;
}
