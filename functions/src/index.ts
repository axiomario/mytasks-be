import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase.json';
import server from './server';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const api = functions.https.onRequest(server);
