export interface IUserInfo {
  username?: string;
  email?: string;
}

export interface IAlertOptions {
  callback?: () => any;
  title?: string;
  message?: string;
  button_text?: string;
}