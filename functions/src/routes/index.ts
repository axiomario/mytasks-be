import { Router } from 'express';

import UserRoutes from './UserRoutes';
import TaskRoutes from './TaskRoutes';
import Paths from './../common/Paths';

const apiRouter = Router();
const taskRouter = Router();
const userRouter = Router();

taskRouter.post(Paths.Tasks.Add, TaskRoutes.add);
taskRouter.get(Paths.Tasks.Get, TaskRoutes.getList);
taskRouter.delete(Paths.Tasks.Delete, TaskRoutes.remove);
taskRouter.put(Paths.Tasks.Update, TaskRoutes.update);
apiRouter.use(Paths.Tasks.Base, taskRouter);

userRouter.get(Paths.Users.Get, UserRoutes.getOne);
userRouter.post(Paths.Users.Add, UserRoutes.add);
apiRouter.use(Paths.Users.Base, userRouter);

export default apiRouter;
