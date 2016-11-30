import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignalRService } from '../../services/index';
import { CurrentUserService } from '../../helpers/index';
import { ChatMessage, CurrentUser, TypingMessage } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'chat-page-component',
    templateUrl: 'chatPage.component.html'
})

export class ChatPageComponent implements OnInit {

    public messageToSend: ChatMessage;
    public allMessages: ChatMessage[];
    public canSendMessage: Boolean;
    public typingToSend: TypingMessage;
    public typingMessageToShow: TypingMessage;
    
    currentUser: CurrentUser;
    
    constructor(private _signalRService: SignalRService, private _ngZone: NgZone, private currentUserService: CurrentUserService) {
        this.subscribeToEvents();
        this.canSendMessage = _signalRService.connectionExists;
        this.messageToSend = new ChatMessage(null, '', '', null);
        this.typingToSend = new TypingMessage('', '');
        this.allMessages = new Array<ChatMessage>();
    }
    
    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
			this.currentUserService.getUserMainInfo()
				.subscribe(
				(data: CurrentUser) => {
					this.currentUser = data;
					console.log('Current User: ', this.currentUser);
				},
				(err) => {
					console.log('ERROR: ', err);
				});

		}
            
    }

    public sendMessage(textToSend: string) {
        if(textToSend.length <= 0) {
            return;
        }
        
        if (this.canSendMessage) {
            this.messageToSend.FromId = this.currentUser.Id;
            this.messageToSend.FromName = this.currentUser.Name;
            this.messageToSend.Sent = new Date();
            this.messageToSend.Message = textToSend;
            
            console.log('MESSAGE TO SEND: ', this.messageToSend);
            this._signalRService.sendChatMessage(this.messageToSend);
        }
    }
    
    public typeMessage(event: any) {
        this.typingToSend.FromName = this.currentUser.Name;
        this.typingToSend.Message = this.currentUser.Name + " is typing a message...";
    
        console.log('TYPING TO SEND: ', this.typingToSend);
        this._signalRService.sendTypingMessage(this.typingToSend);
    }

    private subscribeToEvents(): void {
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });

        this._signalRService.messageReceived.subscribe((message: ChatMessage) => {
            console.log('GOT MESSAGE: ', message);
            this._ngZone.run(() => {
                (<HTMLInputElement>document.getElementById('messageToSend')).value = '';
                this.messageToSend = new ChatMessage(null, '', '', null);
                this.allMessages.push(new ChatMessage(message.FromId, message.FromName, message.Message, message.Sent.toString()));
                this.typingMessageToShow = new TypingMessage('', '');
            });
        });
        
        this._signalRService
            .typingReceived
            .subscribe((msg: TypingMessage) => {
                console.log('GOT MESSAGE: ', msg);
                this._ngZone.run(() => {
                    this.typingToSend = new TypingMessage('', '');
                    this.typingMessageToShow = msg;
                }); 
            });
    }
}