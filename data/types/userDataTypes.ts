// tests/data/types.ts

export class UserDataType {
  userName: string;
  

  constructor(userName: string) {
    this.userName = userName;
    
  }

  static fromUserDataJson(json: any): UserDataType{
    return new UserDataType(json.userName)
  }
}
