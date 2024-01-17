import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatSendComponent } from './chat-send/chat-send.component';
import { initFlowbite } from 'flowbite';
import { catchError, retry, throwError } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  messages: any[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private deviceService: DeviceDetectorService
  ) {
    // subscribe to messages
    this.webSocketService.webSocket$
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(err));
        }),
        retry({ delay: 5_000 }),
        takeUntilDestroyed()
      )
      .subscribe((value: any) => {
        this.messages.push(JSON.parse(value));
      });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  onUserInfoSubmitted(event: any) {
    this.userInfo = event;
    this.showUserInfoForm = false;
  }

  get sentMessageDate() {
    return new Date().toUTCString();
  }

  get browserName() {
    return this.deviceService.browser.toLowerCase();
  }

  onChatMessageSubmitted(message: string) {
    const messageBody = {
      name: this.userInfo.username,
      dateTime: this.sentMessageDate,
      content: message,
      profile: `assets/chat-avatar-${this.browserName}.jpg`,
    };
    this.webSocketService.sendMessageToWebSocketServer(messageBody);
  }
}
