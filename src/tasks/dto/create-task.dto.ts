import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
