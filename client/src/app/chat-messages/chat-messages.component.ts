import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent],
  template: `<app-chat-message
    *ngFor="let item of messages"
    [name]="item.name"
    [content]="item.content"
    [profile]="item.profile"
    [dateTime]="item.dateTime"
  ></app-chat-message>`,
  styles: [
    `
      :host {
        @apply flex flex-col w-full justify-start items-start max-h-96 min-h-80 overflow-scroll pt-4 pb-4;
      }
    `,
  ],
})
export class ChatMessagesComponent {
  @Input() messages: any[] = [];
}
