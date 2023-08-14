import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface IUser {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
}

interface IUserContext {
  user: IUser | null,
  addUser: (addUser: IUser) => void,
  deleteUser: () => void,
}

export const UserContext = createContext<IUserContext>({
  user: {
    displayName: null,
    email: null,
    photoURL: null,
  },
  addUser: () => {},
  deleteUser: () => {},
});

function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('render userProvider');
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(() => {
          const { displayName, email, photoURL } = authUser;
          return { displayName, email, photoURL };
        });
      }
      setIsLoading(false);
    });
  }, []);

  const addUser = (newUser: IUser) => {
    setUser(newUser);
  };

  const deleteUser = () => {
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    addUser,
    deleteUser,
  }), [user]);

  return (
    <UserContext.Provider value={value}>
      { isLoading ? <div>loading</div> : children }
    </UserContext.Provider>
  );
}

export default UserProvider;
