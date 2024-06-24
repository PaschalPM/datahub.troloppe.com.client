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
import { UtilsService } from '../../services/utils.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MyMatIconComponent, NgIf, CapitalizePipe],
  template: `
    <div class="mb-6 text-gray-600 dark:text-white">
      <div>
        <label [for]="name" class="text-base lg:text-lg">
          {{ label }}<span class="font-bold" *ngIf="isRequired"> *</span></label
        >
        <!---: Image Uploader -->
        <div class="relative size-32" *ngIf="!imageUrl">
          <div
            [class]="utils.cn('h-full  border border-gray-400 rounded-xl flex justify-center items-center text-4xl', errorBorder)"
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
            type="button"
            (click)="deleteImage()"
            class="text-3xl absolute -top-1 right-1 font-medium text-red-500/50 dark:text-red-400/50 hover:text-red-500 hover:dark:text-red-400"
          >
            &times;
          </button>
          <!---: Uploading Spinner -->
          <div
            *ngIf="isLoading"
            class="absolute inset-0 bg-black/50 flex justify-center items-center"
          >
            <my-mat-icon class="animate-spin"> settings </my-mat-icon>
          </div>
        </div>
        <!---: End Image Viewer -->
      </div>
      <div
        [class]="
          utils.cn(
            '!-mt-1  transform rounded text-sm text-red-500 opacity-100 transition-all duration-150 ease-in-out dark:text-red-400',
            { '!mt-1 opacity-100': formIsSubmitting && control.invalid }
          )
        "
      >
        <div *ngIf="control.errors?.['required'] && formIsSubmitting">
          An image is a required.
        </div>
      </div>
    </div>
  `,
})
export class ImageUploaderComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formIsSubmitting!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) isLoading = false;

  @Output() isLoadingChange = new EventEmitter();

  @ViewChild('thumbnail', { static: false })
  thumbnail!: ElementRef<HTMLImageElement>;

  isRequired = false;
  control!: FormControl;
  imageUrl = '';

  get errorBorder() {
    return this.formIsSubmitting && this.control.invalid
      ? 'ring-1 ring-red-500 dark:ring-red-400 border-none'
      : '';
  }
  
  constructor(
    private tempImgUploader: TempImageUploaderService,
    public utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.isRequired = this.control.hasValidator(Validators.required);
  }

  deleteImage() {
    if (this.imageUrl && !this.isLoading) {
      this.isLoading = true;
      this.tempImgUploader.deleteImage(this.imageUrl).subscribe({
        next: () => {
          this.resetImage();
        },
        error: () => {
          this.resetImage();
        },
      });
    }
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
    this.isLoading = true;
    this.isLoadingChange.emit(this.isLoading);
    this.tempImgUploader.store(formData).subscribe({
      next: (value) => {
        this.imageUrl = value.image_tmp_url;
        this.control.setValue(value.image_tmp_url);
        this.isLoading = false;
        this.isLoadingChange.emit(this.isLoading);
      },
      error: (err) => {
        if (err.status === 422) {
          alert('Image format is not supported.')
        }
        this.resetImage()
      },
    });
  }

  private resetImage() {
    this.imageUrl = '';
    this.isLoading = false;
    this.control.setValue(null);
  }
}
