export class LocalStorageUtils {

  public saveUser(user: string) {
    localStorage.setItem('user.id', JSON.stringify(user));
  }
  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  public saveLocalDataUser(response: any) {
    this.saveToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public cleanLocalDataUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user.id');
  }

  public getUserToken(): string {
    return localStorage.getItem('token');
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user.id'));
  }
}
