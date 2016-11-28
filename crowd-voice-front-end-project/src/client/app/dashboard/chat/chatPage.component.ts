import { Component, NgZone } from '@angular/core';
import { SignalRService } from '../../services/index';
import { ChatMessage } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'chat-page-component',
    templateUrl: 'chatPage.component.html'
})

export class ChatPageComponent {

    public currentMessage: ChatMessage;
    public allMessages: ChatMessage[];
    public canSendMessage: Boolean;
    
    constructor(private _signalRService: SignalRService, private _ngZone: NgZone) {
        this.subscribeToEvents();
        this.canSendMessage = _signalRService.connectionExists;
        this.currentMessage = new ChatMessage('', '', null);
        this.allMessages = new Array<ChatMessage>();
    }

    public sendMessage() {
        if (this.canSendMessage) {
            alert('SEND IT!');
            this.currentMessage.Sent = new Date();
            console.log('MESSAGE TO SEND: ', this.currentMessage);
            this._signalRService.sendChatMessage(this.currentMessage);
        }
    }

    private subscribeToEvents(): void {
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });

        this._signalRService.messageReceived.subscribe((message: ChatMessage) => {
            alert('GOT MESSAGE');
            this._ngZone.run(() => {
                this.currentMessage = new ChatMessage('', '', null);
                this.allMessages.push(new ChatMessage(message.From, message.Message, message.Sent.toString()));
            });
        });
    }
}