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
