import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getDatabase, ref,
} from 'firebase/database';
import {
  getStorage, ref as storageRef,
  uploadString, getDownloadURL,
  uploadBytes,
  getMetadata,
  deleteObject,
} from 'firebase/storage';

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATA_BASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = getAuth(app);
const db = getDatabase(app);

const dbRef = ref(db);
const projectRef = ref(db, 'projects');
const tagsRef = ref(db, 'dictionaries/tags');

const storage = getStorage(app);

export {
  db,
  auth,
  dbRef,
  projectRef,
  tagsRef,
  storage,
  storageRef,
  uploadString,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  deleteObject,
};
