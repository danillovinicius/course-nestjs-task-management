import { EntityRepository, MongoRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends MongoRepository<Task> {

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = [];

    if (status) {
      query.push({ $match: { status } });
    }

    if (search) {
      query.push({ $match: { title: { $regex: `.*${search}.*` } } });
    }

    const results = await this.aggregate(query);
    return results.toArray();
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

}
