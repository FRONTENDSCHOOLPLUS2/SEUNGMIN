export type board = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
    profileImage: string;
  };
};
