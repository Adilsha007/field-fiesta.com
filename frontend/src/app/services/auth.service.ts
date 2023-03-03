import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResData, AuthResData_admin } from '../models/auth-res-data';
import { Admin, OtpUser, User } from '../models/user.model';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(
    username: string,
    email: string,
    phoneno: number
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      AUTH_API + 'signup',
      {
        username,
        email,
        phoneno,
      },
      httpOptions
    );
  }

  otpSubmit(
    username: string,
    email: string,
    phoneno: number,
    password: string,
    otp: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      AUTH_API + 'otp',
      {
        username,
        email,
        phoneno,
        password,
        otp,
      },
      httpOptions
    );
  }

  login(email: string, password: string): Observable<AuthResData> {
    return this.http.post<AuthResData>(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  adminLogin(email: string, password: string): Observable<AuthResData_admin> {
    return this.http.post<AuthResData_admin>(
      AUTH_API + 'admin/login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<{message: string}> {
    return this.http.get<{message: string}>(AUTH_API + 'logout');
  }

  setOtpUserInLocalStorage(user: OtpUser) {
    localStorage.setItem('otpData', JSON.stringify(user));
  }

  getOtpUserFromLocalStorage() {
    const userDataString = localStorage.getItem('otpData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    }

    return null;
  }

  formateUser(data: AuthResData) {
    return new User(
      data.id,
      data.username,
      data.email,
      data.phoneno,
      data.token
    );
  }

  formateAdmin(data: AuthResData_admin) {
    return new Admin(data.id, data.email, data.token);
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    }
    return null;
  }
}
