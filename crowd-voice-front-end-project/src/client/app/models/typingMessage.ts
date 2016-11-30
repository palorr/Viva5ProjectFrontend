export class TypingMessage {
    public FromName: string;
    public Message: string;

    constructor(fromName: string, message: string) {
		this.FromName = fromName;
        this.Message = message;
    }
}