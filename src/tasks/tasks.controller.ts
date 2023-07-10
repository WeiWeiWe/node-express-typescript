import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (err) {
      console.error(err);
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TasksController();
