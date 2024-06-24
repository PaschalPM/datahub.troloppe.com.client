import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MyMatIconComponent } from '../common/my-mat-icon.component';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TempImageUploaderService } from '../../services/temp-image-uploader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MyMatIconComponent, NgIf],
  template: `
    <div>
      <label [for]="name" class="text-base lg:text-lg">
        {{ label }}<span class="font-bold" *ngIf="isRequired"> *</span></label
      >
      <!---: Image Uploader -->
      <div class="relative size-32" *ngIf="!imageUrl">
        <div
          class="h-full  border rounded-xl flex justify-center items-center text-4xl"
        >
          +
        </div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          class="absolute top-0 inset-0 cursor-pointer opacity-0"
          (change)="handleChange($event)"
        />
      </div>
      <!-- End Image Uploader -->

      <!---: Image Viewer -->
      <div class="relative size-32" *ngIf="imageUrl">
        <img
          [src]="imageUrl"
          alt=""
          #thumbnail
          class="size-32 rounded-lg object-cover"
        />
        <!---: Cancel Button -->
        <button
          (click)="imageUrl = ''"
          class="text-3xl absolute -top-1 right-1 font-medium text-red-500/50 dark:text-red-400/50 hover:text-red-500 hover:dark:text-red-400"
        >
          &times;
        </button>
        <!---: Uploading Spinner -->
        <div
          *ngIf="isUploading"
          class="absolute inset-0 bg-black/50 flex justify-center items-center"
        >
          <my-mat-icon class="animate-spin"> settings </my-mat-icon>
        </div>
      </div>
      <!---: End Image Viewer -->
    </div>
  `,
})
export class ImageUploaderComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formIsSubmitting!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() isUploading = false;

  @Output() isUploadingChange = new EventEmitter();

  @ViewChild('thumbnail', { static: false })
  thumbnail!: ElementRef<HTMLImageElement>;

  isRequired = false;
  control!: FormControl;
  imageUrl = '';

  constructor(
    private tempImgUploader: TempImageUploaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.isRequired = this.control.hasValidator(Validators.required);
  }

  handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(this.thumbnail.nativeElement.src);
      });
      this.uploadToServer(file);
    }
  }

  private uploadToServer(image: File) {
    const formData = new FormData();
    formData.set(this.name, image, image.name);
    this.isUploading = true;
    this.isUploadingChange.emit(this.isUploading);
    this.tempImgUploader.store(formData).subscribe({
      next: (value) => {
        this.imageUrl = value.image_tmp_url;
        this.control.setValue(value.image_tmp_url);
        this.isUploading = false;
        this.isUploadingChange.emit(this.isUploading);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
