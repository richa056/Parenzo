import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { config } from '@/config';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: config.firebase.projectId,
    clientEmail: `firebase-adminsdk-${config.firebase.projectId}@${config.firebase.projectId}.iam.gserviceaccount.com`,
    privateKey: config.firebase.privateKey?.replace(/\\n/g, '\n'),
  }),
  databaseURL: `https://${config.firebase.projectId}.firebaseio.com`,
};

export const initializeFirebaseAdmin = () => {
  if (!getApps().length) {
    initializeApp(firebaseAdminConfig);
  }
};

const adminAuth = getAuth();

export { adminAuth };