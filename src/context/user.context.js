import { createContext } from 'react';

const UserContext = createContext({
  id: '',
  role: '',
  setUser: () => {},
});

export default UserContext;
