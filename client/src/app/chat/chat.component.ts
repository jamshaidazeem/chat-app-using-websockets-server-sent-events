import { Component } from '@angular/core';
// ref:- https://angular.io/guide/content-projection
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  template: `
    <ng-content [select]="chatHeader"></ng-content>
    <ng-content [select]="chatMessages"></ng-content>
    <ng-content [select]="chatSend"></ng-content>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col w-full h-fit justify-start items-center bg-slate-100 border border-slate-300 border-solid rounded-md p-2;
      }
    `,
  ],
})
export class ChatComponent {}
