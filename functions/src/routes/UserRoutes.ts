import HttpStatusCodes from './../common/HttpStatusCodes';
import UserService from './../services/UserService';
import { IUser } from './../models/User';

import { IReq, IRes } from './common/types';

async function add(req: IReq, res: IRes) {
  const { email } = req.body as unknown as IUser;
  
  await UserService.add({ email });

  return res.status(HttpStatusCodes.CREATED).end();
}

async function getOne(req: IReq, res: IRes) {
  const { email } = req.query as unknown as { email: string };
  const user = await UserService.getOne(email);

  return res.status(HttpStatusCodes.OK).send(user);
}

export default {
  getOne,
  add
} as const;
