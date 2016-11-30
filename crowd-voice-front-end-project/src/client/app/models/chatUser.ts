export class ChatUser {
    public UserId: number;
	public UserName: string;
    
	constructor(userId: number, userName: string) {
		this.UserId = userId;
        this.UserName = userName;
    }
}