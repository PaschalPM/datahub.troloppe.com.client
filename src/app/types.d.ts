type EventEmitterType<T> = { event: string; payload: T };
type LoginStageType = 'VERIFY_EMAIL' | 'LOGIN_STAGE';
type ColorSchemeType = 'auto' | 'light' | 'dark';

type AuthType = {
  email: string;
  password: string;
  token: string;
};

type NotificationType = {
  id: string;
  label: string;
  message: string;
  send_at: string;
  severity: 'warning' | 'info';
  is_read: boolean;
};

type OverviewWidgetItem = {
  id: number;
  totalSum: number;
  overviewTitle: string;
  myMatIcon: string;
};

// New Street Data Form Types
type OptionType = { value: string; label: string };

type IdAndNameType = { id: number; name: string };
type IdAndValueType = { id: number; value: string };
type NameAndValueType = { name: string; value: number };

type SectionType = IdAndNameType & { location_id: number };
type LocationType = IdAndNameType & { is_active: boolean };
type UniqueCodeType = IdAndValueType & { location_id?: number };
type SubSectorType = IdAndNameType & {sector_id: number}

type NewStreetDataFormType = {
  unique_codes: IdAndValueType[];
  locations: LocationType[];
  sections: SectionType[];
  sectors: IdAndNameType[];
  sub_sectors: Array<SubSectorType>;
};

type NewStreetDataFormEventType<T> = { key: string; value: T[] };

// Confirmation Modal
type ConfirmModalPropsType = {
  matIconName: string;
  title: string;
  message: string;
  severity?: 'error' | 'warning';
  ok: () => void;
};

// MODAL TYPES
type InputsType = Record<string, unknown> | undefined;
type ModalValueType = { template: Type<any>; inputs: InputsType; modalIcon?: string};
type ImageModalValueType = { template: Type<any>; imageUrl: string };