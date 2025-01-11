import messages from './src/messages/en-US.json';
 
type Messages = typeof messages;
 
declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}