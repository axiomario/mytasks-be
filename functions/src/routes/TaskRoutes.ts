import { IReq, IRes } from "./common/types";
import HttpStatusCodes from "./../common/HttpStatusCodes";
import { ITask } from "./../models/Task";
import moment from "moment";
import TaskService from './../services/TaskService';

async function add(req: IReq, res: IRes) {
  const { email, title, description } = req.body as unknown as ITask;
  const created = moment().format('YYYY-MM-DD HH:mm:ss');
  const task: ITask = {
    email,
    title,
    description,
    created,
    check: false
  };
  const newTask = await TaskService.add(task);

  return res.status(HttpStatusCodes.CREATED).send(newTask);
}

async function getList(req: IReq, res: IRes) {
  const { email } = req.query as unknown as { email: string };
  const list = await TaskService.getList(email);

  return res.status(HttpStatusCodes.OK).send(list);
}

async function remove(req: IReq, res: IRes) {
  const { id } = req.params as unknown as { id: string };
  
  await TaskService.remove(id);

  return res.status(HttpStatusCodes.OK).end();
}

async function update(req: IReq, res: IRes) {
  const { id } = req.params as unknown as { id: string };
  const task = req.body as unknown as ITask;
  const result = await TaskService.update(id, task);

  return res.status(HttpStatusCodes.OK).send(result);
}

export default {
  add,
  getList,
  remove,
  update
} as const;