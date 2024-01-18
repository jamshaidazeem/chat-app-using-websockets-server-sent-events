import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  DoCheck,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IMessage } from '../models/message';
import { ObserveVisibilityDirective } from '../directives/observe-visibility.directive';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent, ObserveVisibilityDirective],
  template: `
    <ng-container *ngFor="let item of messages">
      <app-chat-message
        [message]="item"
        observeVisibility
        [debounceTime]="500"
        (visible)="onMessageVisible(item)"
      ></app-chat-message>
    </ng-container>
    <p
      *ngIf="messages.length === 0"
      class="w-full mt-[20%] text-sm text-center font-normal text-gray-900 dark:text-white"
    >
      No Messages!
    </p>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col w-full justify-start items-start h-96 overflow-scroll pt-4 pb-4;
      }
    `,
  ],
})
export class ChatMessagesComponent implements DoCheck {
  @Input() messages: IMessage[] = [];
  @Output() messageOnScreenEvent = new EventEmitter<IMessage>();

  private _messagesCount = 0;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.messages.length > this._messagesCount) {
      this._messagesCount = this.messages.length;
      this.changeRef.markForCheck();
    }
  }

  onMessageVisible(message: IMessage) {
    this.messageOnScreenEvent.next(message);
  }
}
