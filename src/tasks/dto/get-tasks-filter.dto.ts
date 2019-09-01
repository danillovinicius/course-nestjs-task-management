import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn } from 'class-validator';

export class GetTasksFilterDTO {

  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
