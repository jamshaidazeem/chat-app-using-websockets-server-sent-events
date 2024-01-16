import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { initFlowbite } from 'flowbite';
import { ChatComponent } from './chat/chat.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UserInfoComponent,
    ChatComponent,
    ChatHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  showUserInfoForm: boolean = true;

  userInfo: any = { username: '', profileImg: null };
  notificationCount: number = 5;

  ngOnInit(): void {
    initFlowbite();
  }

  onUserInfoSubmitted(event: any) {
    this.userInfo = event;
    this.showUserInfoForm = false;
  }
}
