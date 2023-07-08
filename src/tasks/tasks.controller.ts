import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';

export class TasksController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAll(): Promise<Task[]> {
    let allTasks: Task[];

    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }
}
