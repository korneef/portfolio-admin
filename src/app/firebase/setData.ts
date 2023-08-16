import { getDatabase, ref, set } from 'firebase/database';

function writeUserData<T>(path: string, data: T) {
  const db = getDatabase();
  return set(ref(db, path), {
    ...data,
  });
}

export default writeUserData;
