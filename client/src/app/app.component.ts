import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatSendComponent } from './chat-send/chat-send.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UserInfoComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatSendComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  showUserInfoForm: boolean = true;

  userInfo: any = { username: '', profileImg: null };
  notificationCount: number = 5;

  messageDate = new Date().toUTCString();

  messages: any[] = [
    {
      name: 'JamshaidAzeem',
      dateTime: this.messageDate,
      content: 'Hello, how are you?',
      profile: 'assets/profile-picture-2.jpeg',
    },
    {
      name: 'UsmanKhan',
      dateTime: this.messageDate,
      content: 'Hi, i am fine?',
      profile: 'assets/profile-picture-1.jpg',
    },
    {
      name: 'JamshaidAzeem',
      dateTime: this.messageDate,
      content: 'Any updates regarding project?',
      profile: 'assets/profile-picture-2.jpeg',
    },
    {
      name: 'UsmanKhan',
      dateTime: this.messageDate,
      content: 'Yes, project details are ready, we can start development',
      profile: 'assets/profile-picture-1.jpg',
    },
  ];

  ngOnInit(): void {
    initFlowbite();
  }

  onUserInfoSubmitted(event: any) {
    this.userInfo = event;
    this.showUserInfoForm = false;
  }

  onChatMessageSubmitted(message: string) {}
}
