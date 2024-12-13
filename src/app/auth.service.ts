import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://laravel.lo/api/register';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(username: string, email: string, password: string, confirmPassword: string) {
    return this.http.post<any>(this.apiUrl, { username, email, password, password_confirmation: confirmPassword })
      .subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          this.router.navigate(['/juegos']);
        },
        error => {
          console.error(error);
        }
      );
  }
}

