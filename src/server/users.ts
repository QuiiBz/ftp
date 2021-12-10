export const USERS: Record<string, string> = {
  admin: 'admin',
  user: 'user',
};

export interface User {
  id: number;
  username: string;
  isLoggedIn: boolean;
  cwd: string;
}

let users: User[] = [];

export const getUser = (id: number): User | undefined => {
  return users.find(current => current.id === id);
};

export const updateUser = (user: User) => {
  users = users.map(current => (current.id === user.id ? user : current));
};

export const addUser = (user: User) => {
  users.push(user);
};

export const removeUser = (id: number) => {
  users = users.filter(current => current.id !== id);
};
