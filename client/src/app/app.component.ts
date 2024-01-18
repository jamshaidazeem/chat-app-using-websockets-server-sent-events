import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { WebSocketService } from './services/web-socket.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IMessage, createIMessage } from './models/message';
import { IUser, createIUser } from './models/user';
import { WebNotificationService } from './services/web-notification.service';
import { NotificationPermissionAlertComponent } from './notification-permission-alert/notification-permission-alert.component';

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
    NotificationPermissionAlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'client';
  showUserInfoForm: boolean = true;

  userInfo: IUser = createIUser('', null);
  notificationCount: number = 0;

  messages: IMessage[] = [];

  showNotificationPermissionAlert: boolean = false;

  constructor(
    private webSocketService: WebSocketService,
    private deviceService: DeviceDetectorService,
    private webNotificationService: WebNotificationService
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
      .subscribe((payloadFromServer: string) => {
        const messageFromServer: IMessage = JSON.parse(payloadFromServer);
        if (
          messageFromServer.profile ===
          this.messageProfileFromLocalAssetsBasedOnBrowser
        ) {
          // message sent by same user, marked as read
          messageFromServer.isRead = true;
        }
        this.messages.push(messageFromServer);
        this.updateNotificationCount();
      });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit(): void {
    // on load check if app has yet asked the user for notifications permission, if not than show alert for consent
    if (!this.webNotificationService.areNotificationsPermissionRequested) {
      setTimeout(() => {
        this.showNotificationPermissionAlert = true;
      });
    }
  }

  onUserRespondToAskForPermissionEvent(granted: boolean) {
    // user response to permission alert consent, move on with browser api for permission consent
    this.showNotificationPermissionAlert = false;
    if (granted) {
      this.webNotificationService.askNotificationPermission();
    }
  }

  onUserInfoSubmitted(user: IUser) {
    this.userInfo = user;
    this.showUserInfoForm = false;
  }

  get browserName() {
    return this.deviceService.browser.toLowerCase();
  }

  get messageProfileFromLocalAssetsBasedOnBrowser() {
    return `assets/chat-avatar-${this.browserName}.jpg`;
  }

  onChatMessageSubmitted(message: string) {
    const newMessage = createIMessage(
      this.userInfo.username,
      message,
      this.messageProfileFromLocalAssetsBasedOnBrowser
    );
    this.webSocketService.sendMessageToWebSocketServer(newMessage);
  }

  onMessageOnScreenEventFired(message: IMessage) {
    message.isRead = true;
    this.updateNotificationCount();
  }

  updateNotificationCount() {
    const unReadMessages = this.messages.filter(
      (msg: IMessage) => msg.isRead === false
    );
    this.notificationCount = unReadMessages.length;
  }
}
