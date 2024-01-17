import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser, createIUser } from '../models/user';
// ref:- https://flowbite.com/docs/forms/input-field/#input-fields
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      class="flex flex-col w-full h-full justify-start items-stretch"
      (ngSubmit)="onClickSubmit()"
      ngNativeValidate
    >
      <!-- (ngSubmit)="onClickSubmit()" added to prevent form submission on submit && to enable ngModel binding -->
      <!-- ngNativeValidate added so tailwind default validations could work 
    because ngSubmit by default adds noValidate class to prevent default html 
    validation which are required for tailwind to work -->

      <h3 class="text-center text-slate-900 mb-8">
        Fill in following to start chatting
      </h3>
      <div>
        <label for="username" class="user-info-input-label mb-2"
          >Username</label
        >
        <input
          type="text"
          id="username"
          placeholder="John"
          required
          class="user-info-input mb-8"
          pattern="^[a-zA-Z0-9]+$"
          minlength="4"
          maxlength="16"
          [(ngModel)]="user.username"
          name="username"
        />
      </div>
      <div>
        <label class="user-info-input-label mb-2" for="file_input"
          >Upload avatar</label
        >
        <input
          class="user-info-input-upload mb-8"
          id="file_input"
          type="file"
          required
          accept=".png, .jpg, .jpeg"
          (change)="onFileUpload($event)"
        />
      </div>
      <button type="submit" class="user-info-button">Submit</button>
    </form>
  `,
  styles: [
    `
      :host {
        @apply flex w-full min-h-52 justify-center items-center bg-slate-100  border border-slate-300 border-solid rounded-md p-4;

        .user-info-input-label {
          @apply block text-sm font-medium text-gray-900 dark:text-white;
        }

        .user-info-input {
          @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
        }

        .user-info-input-upload {
          @apply block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400;
        }

        .user-info-button {
          @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
        }
      }
    `,
  ],
})
export class UserInfoComponent {
  @Output() onUserInfoSubmittedEvent = new EventEmitter<IUser>();

  profileImgFile?: File;
  user: IUser = createIUser('', null);

  onClickSubmit = () => {
    if (this.profileImgFile) {
      const reader = new FileReader();
      reader.onload = ($event: any) => {
        this.user.profileImg = $event.target.result;
        // update parent
        this.onUserInfoSubmittedEvent.next(this.user);
      };
      reader.readAsDataURL(this.profileImgFile);
    }
  };

  onFileUpload = (event: any) => {
    this.profileImgFile = event.target.files[0];
  };
}
