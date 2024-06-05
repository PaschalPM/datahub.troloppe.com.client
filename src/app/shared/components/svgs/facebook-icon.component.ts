import { Component } from '@angular/core';

@Component({
  selector: 'facebook-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <rect width="28" height="28" fill="url(#pattern0_10_3174)" />
      <defs>
        <pattern
          id="pattern0_10_3174"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlink:href="#image0_10_3174" transform="scale(0.0166667)" />
        </pattern>
        <image
          id="image0_10_3174"
          width="60"
          height="60"
          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAABW0lEQVR4nO3YMUpDQRDG8VEEO7X3CHYewM4LWOgBBDtrwbeTmQkpbFNbCIJNzM7r0igI4hksxAMoiPamiKS0yXtGAtnd7wd7gD/7LTweEQAAwC8iow3t1McW/Fo5PlvwdwtxrOzfyvFTOb4p+4uG+CjBDyhVIg9rxt6xEL+MfdLmaPCKUiRSbxn7XdvQpIMnNFkxjvVfY5MN7nJ9Mk9sksEisqocX4sJNo7788amGtwrKlhDvG+MYr/shtud/ulonVKnDe9X2W8oJ8rxY1awVMM9yomFOJ4V3DsfbFNOrOH9Tj83qaRgyo0h2NO+YfvHR0Wb0w1+SCUFi8RdKin44mywScvEFhg7/dVDy8YWGRz8iZaNLfaGr6iwG66oqODO8IhSYw1RlBtDsOOGs2KYtGPSWTFM2jHprBgm7Zh0VgyTdkw6K4ZJOyadFcOkHZPOimHSnvekAQCA5vcDGQr72owBOXkAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  `,
})
export class FacebookIconComponent {}
