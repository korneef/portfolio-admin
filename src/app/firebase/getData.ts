import { child, get } from 'firebase/database';

import { dbRef } from './firebase';

function getData(path: string) {
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    })
    .catch(() => null);
}

export default getData;
