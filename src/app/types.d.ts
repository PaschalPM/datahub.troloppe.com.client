type EventEmitterType<T> = { event: string; payload: T };
type LoginStageType = 'VERIFY_EMAIL' | 'LOGIN_STAGE';
type ColorSchemeType = 'auto' | 'light' | 'dark';

type AuthType = {
  email: string;
  password: string;
  token: string;
};

type NotificationType = {
  id: number;
  label: string;
  message: string;
  sendAt: string;
  severity: 'warning' | 'info';
  isRead: boolean;
};

type OverviewWidgetItem = {
  id: number,
  totalSum: number;
  overviewTitle: string;
  myMatIcon: string;
};

type OptionType = { value: string; label: string };

type IdAndValueType = {id: number, value: string}

type NewStreetDataFormType = {
  // unique_codes: 
  locations:  (IdAndValueType & {sections: Array<IdAndValueType>})[]
}