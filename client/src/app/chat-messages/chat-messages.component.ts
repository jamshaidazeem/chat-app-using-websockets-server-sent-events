import { ChangeDetectorRef, Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IMessage } from '../models/message';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent],
  template: `
    <app-chat-message
      *ngFor="let item of messages"
      [message]="item"
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
  @Input() messages: IMessage[] = [];

  private _messagesCount = 0;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.messages.length > this._messagesCount) {
      this._messagesCount = this.messages.length;
      this.changeRef.markForCheck();
    }
  }
}
