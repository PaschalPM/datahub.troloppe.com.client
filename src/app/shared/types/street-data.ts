export type StreetData = {
  id?: number;
  unique_code: string; // *
  street_address: string; // *
  description: string;
  sector: string; // enum // *
  section: string; // *
  location: string; // *
  number_of_units: number;
  contact_name: string;
  contact_number: string;
  contact_email: string;
  construction_status: string; // enum
  is_verified: boolean; // *
  image_path: string; // *
  geolocation: string;
  creator: string;
  created_at: string;
  updated_at: string;
};

export type StreetDataColType = Pick<
  StreetData,
  | 'unique_code'
  | 'street_address'
  | 'sector'
  | 'section'
  | 'location'
  | 'is_verified'
  | 'image_path'
>;
