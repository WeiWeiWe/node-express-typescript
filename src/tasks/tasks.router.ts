import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

export const tasksRouter: Router = Router();

tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
  },
);
