export class UserContext {
  userId: number;
  email: string;
  type: number;
  constructor(userId: number, email: string, type: number) {
    this.userId = userId;
    this.email = email;
    this.type = type;
  }
}
