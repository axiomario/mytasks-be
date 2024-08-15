import { RouteError } from './../common/classes';
import HttpStatusCodes from './../common/HttpStatusCodes';
import * as admin from 'firebase-admin';

import { ITask } from './../models/Task';

async function add(task: ITask): Promise<ITask> {
  try {
    const db = admin.firestore();
    const response = await db.collection('tasks').add(task);

    return {
      ...task,
      id: response.id
    };
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }
}

async function getList(email: string): Promise<ITask[]> {
  try {
    const db = admin.firestore();
    const response = await db.collection('tasks').where('email', '==', email).get();
    const list:ITask[] = response.docs.map(doc => ({
      ...(doc.data() as ITask),
      id: doc.id
    }));
  
    return list;
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }
}

async function remove(id: string): Promise<void> {
  const db = admin.firestore();
  const doc = await db.collection('tasks').doc(id);

  if (!(await doc.get()).exists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Tarea no encontrada');
  }
  try {
    await doc.delete();
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }
}

async function update(id: string, task: ITask): Promise<ITask> {
  const db = admin.firestore();
  const doc = await db.collection('tasks').doc(id);

  if (!(await doc.get()).exists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Tarea no encontrada');
  }
  try {
    await doc.update({
      title: task.title,
      description: task.description,
      check: task.check
    });
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }

  return {
    ...task
  };
}

export default {
  add,
  getList,
  remove,
  update
} as const;
