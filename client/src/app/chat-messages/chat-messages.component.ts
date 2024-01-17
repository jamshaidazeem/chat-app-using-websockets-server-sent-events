import { ChangeDetectorRef, Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent],
  template: `
    <app-chat-message
      *ngFor="let item of messages"
      [name]="item.name"
      [content]="item.content"
      [profile]="item.profile"
      [dateTime]="item.dateTime"
    ></app-chat-message>
    <p
      *ngIf="messages.length === 0"
      class="w-full text-sm text-center font-normal text-gray-900 dark:text-white"
    >
      No Messages!
    </p>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col w-full justify-center items-start max-h-96 min-h-80 overflow-scroll pt-4 pb-4;
      }
    `,
  ],
})
export class ChatMessagesComponent implements DoCheck {
  @Input() messages: any[] = [];

  private _messagesCount = 0;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.messages.length > this._messagesCount) {
      this._messagesCount = this.messages.length;
      this.changeRef.markForCheck();
    }
  }
}
