export class loginModel {
  username: string;
  password: string;
  ipAddress: string;

  constructor({ username, password, ipAddress }: { username: string; password: string; ipAddress: string }) {
    this.username = username;
    this.password = password;
    this.ipAddress = ipAddress;
  }
}
export class registerModel {
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor({ firstName, lastName, username, password }: { firstName: string; lastName: string; username: string; password: string }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}
export class refreshTokenModel {
  token: string;
  ipAddress: string;

  constructor({ token, ipAddress }: { token: string; ipAddress: string }) {
    this.token = token;
    this.ipAddress = ipAddress;
  }
}
export class revokeTokenModel {
  token: string;
  ipAddress: string;

  constructor({ token, ipAddress }: { token: string; ipAddress: string }) {
    this.token = token;
    this.ipAddress = ipAddress;
  }
}
