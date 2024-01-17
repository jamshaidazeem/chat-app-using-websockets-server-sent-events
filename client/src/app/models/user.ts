export type IUser = {
  username: string;
  profileImg: any;
};

export const createIUser = (username: string = '', profileImg: any) => {
  return <IUser>{
    username: username,
    profileImg: profileImg,
  };
};
