import { Component, Input } from '@angular/core';
import { ChatNotificationComponent } from '../chat-notification/chat-notification';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [ChatNotificationComponent],
  template: `<div class="container-profile">
      <img class="w-12 h-12 rounded-full" [src]="profile" [alt]="name" />
    </div>
    <div class="container-name">
      <span>{{ name }}</span>
    </div>
    <div class="container-notification">
      <app-chat-notification
        [count]="notificationCount"
      ></app-chat-notification>
    </div> `,
  styles: [
    `
      :host {
        @apply flex flex-row w-full h-20 bg-slate-200 justify-start items-center;
        .container-profile {
          @apply flex w-1/5 h-full justify-center items-center;
        }
        .container-name {
          @apply flex flex-grow h-full justify-start items-center p-2 text-gray-700 font-medium text-lg;
        }
        .container-notification {
          @apply flex w-1/4 h-full justify-center items-center;
        }
      }
    `,
  ],
})
export class ChatHeaderComponent {
  @Input() name = '';
  @Input() notificationCount = 0;
  @Input() profile: any;
}
