import { RouteError } from './../common/classes';
import HttpStatusCodes from './../common/HttpStatusCodes';
import * as admin from 'firebase-admin';

import { IUser } from './../models/User';

async function add(user: IUser): Promise<IUser> {
  try {
    const db = admin.firestore();
    const response = await db.collection('users').add(user);

    return {
      ...user,
      id: response.id
    };
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }
}

async function getOne(email: string): Promise<IUser | undefined> {
  try {
    const db = admin.firestore();
    let user: IUser | undefined = undefined;
    
    await db.collection('users').where('email', '==', email).get().then(querySnapshot => {
      if(!querySnapshot.empty) {
        user = querySnapshot.docs[0].data() as IUser;
      }
    });
  
    return user;
  } catch (error) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error);
  }
}

export default {
  getOne,
  add
} as const;
