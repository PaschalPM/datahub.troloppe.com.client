interface StreetDataFormFieldDataInterface {
  unique_codes: Array<{ id: number; value: string; location_id?: number }>;
  locations: Array<{
    id: number;
    name: string;
    is_active: boolean;
    sections: Array<{ id: number; location_id: number; name: string }>;
  }>;
  sectors: Array<{
    id: number;
    name: string;
    sub_sectors: Array<{ id: number; sector_id: number; name: string }>;
  }>;
};

type StreetData = {
    id?: number;
    unique_code: string; // *
    street_address: string; // *
    description: string;
    sector: string; // enum // *
    sector_id: number
    sub_sector: string
    sub_sector_id: number
    section: string; // *
    section_id: number; // *
    location: string; // *
    location_id: number; // *
    number_of_units: number;
    contact_name: string;
    contact_numbers: string;
    contact_email: string;
    construction_status: string; // enum
    is_verified: boolean; // *
    image_path: string; // *
    geolocation: string;
    creator: string;
    created_at: string;
    updated_at: string;
  };
  