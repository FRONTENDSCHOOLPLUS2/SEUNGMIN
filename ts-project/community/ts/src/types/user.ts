export interface UserType {
  item: {
    id: number;
    name: string;
    email: string;
    type: 'user';
    profileImage: {
      originalname: string;
      name: string;
      path: string;
    };
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export type SignupValues = {
  email: string;
  password: string;
  name: string;
  type: 'user'; // 기본값으로 'user' 설정
  profileImage: string | null;
};
