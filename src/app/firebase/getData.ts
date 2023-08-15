import { child, get } from 'firebase/database';
import { dbRef } from './firebase';

async function getData(path: string) {
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      console.log('No data');
      return null;
    }).catch((error) => {
      console.error(error);
      return null;
    });
}

export default getData;
