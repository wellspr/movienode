import en from './src/messages/en-US.json';
 
type Messages = typeof en;
 
declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}