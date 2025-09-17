import { Priority, Status } from '../../enum/ticket.enum';
export declare class CreateTicketDto {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
}
