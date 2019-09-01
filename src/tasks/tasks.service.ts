import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) { }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(new ObjectID(id));

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.tasksRepository.remove(({ id: new ObjectID(id) }) as Task);
  }

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDTO);
  }

}
