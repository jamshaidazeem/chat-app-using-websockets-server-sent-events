import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Output() onUserInfoSubmittedEvent = new EventEmitter<any>();

  username: string = '';
  profileImgFile?: File;
  profileImg: any;

  onClickSubmit = () => {
    if (this.profileImgFile) {
      const reader = new FileReader();
      reader.onload = ($event: any) => {
        this.profileImg = $event.target.result;
        // update parent
        this.onUserInfoSubmittedEvent.next({
          username: this.username,
          profile: this.profileImg,
        });
      };
      reader.readAsDataURL(this.profileImgFile);
    }
  };

  onFileUpload = (event: any) => {
    this.profileImgFile = event.target.files[0];
  };
}
