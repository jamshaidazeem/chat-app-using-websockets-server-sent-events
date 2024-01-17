export type IMessage = {
  name: string;
  dateTime: string;
  content: string;
  profile: string;
  isRead: boolean;
};

export const createIMessage = (
  name: string = '',
  content: string = '',
  profile: string = ''
) => {
  return <IMessage>{
    name: name,
    dateTime: new Date().toUTCString(),
    content: content,
    profile: profile,
    isRead: false,
  };
};
