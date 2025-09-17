import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Priority, Status } from '../../enum/ticket.enum';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['OPEN', 'IN_PROGRESS', 'RESOLVED'])
  status: Status;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority: Priority;
}
