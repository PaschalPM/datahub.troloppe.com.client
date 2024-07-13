import { FormGroup } from '@angular/forms';

export class CreateStreetDataHelper {

  protected formatedDataForSubmission(
    streetDataFormGroup: FormGroup<any>,
    uniqueCodes: UniqueCodeType[]
  ): any {
    const body ={...streetDataFormGroup.value};

    const uniqueCodeStreetDataId = streetDataFormGroup.value.unique_code;

    // Set unique_code with string value
    body.unique_code = uniqueCodes.find(
      (uniqueCode) => uniqueCode.id === uniqueCodeStreetDataId
    )?.value;

    // Set unique_code as null if its New Entry
    if (body.unique_code === 'New Entry') {
      body.unique_code = null;
    }

    // set Sector ID
    body.sector_id = body.sector;

    // set Sub Sector ID
    body.sub_sector_id = body.sub_sector;

    // set Location ID
    body.location_id = streetDataFormGroup.controls['location'].value;

    // set Section ID
    body.section_id = body.section;

    // set Image Path
    body.image_path = body.image;

    return body;
  }
}
