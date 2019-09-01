import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private taskService: TasksService) { }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Patch('/:id/:status')
  updateTaskStatus(@Param('id') id: string, @Param('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskService.getTasks(filterDTO);
  }
}
