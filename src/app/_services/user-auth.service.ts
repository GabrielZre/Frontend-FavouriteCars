import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] | null {
    const rolesString = localStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : null;
  }

  public setToken(jwtToken:string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken') || null; // Ensure the result is a string or null
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
