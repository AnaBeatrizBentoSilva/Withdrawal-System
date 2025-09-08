import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================================
  // AUTENTICAÇÃO
  // ================================

  login(username: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<{ token: string }>(
        `${this.apiUrl}/auth/login`,
        { username, password },
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro na API de login:', error);

          let message = 'Erro ao realizar login';

          if (error.status === 401 || error.status === 403) {
            message = 'Usuário ou senha incorreto';
          }

          if (error.error?.message) {
            message = error.error.message;
          }

          return throwError(() => new Error(message));
        })
      );
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, user);
  }

  // ================================
  // USUÁRIO
  // ================================
  getUserInfo(username: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http
      .get(`${this.apiUrl}/user/info?username=${username}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar informações do usuário:', error);
          return throwError(
            () =>
              new Error(error.error?.message || 'Erro ao buscar informações')
          );
        })
      );
  }

  updateUserProfile(
    personId: string,
    update: {
      username: string;
      email: string;
      phoneNumber: string;
      address: string;
    }
  ) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.put(`${this.apiUrl}/people/${personId}`, update, {
      headers,
    });
  }

  // ================================
  // OPERAÇÕES
  // ================================

  createDeposit(deposit: {
    value: number;
    description: string;
    accountSourceId: string;
  }) {
    const accountSourceId =
      deposit.accountSourceId || localStorage.getItem('accountId');
    if (!accountSourceId) throw new Error('Conta de origem não encontrada');

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };

    return this.http.post(
      `${this.apiUrl}/operations`,
      {
        typeOperation: 'DEPOSITO',
        value: deposit.value,
        description: deposit.description,
        accountSourceId
      },
      { headers }
    );
  }
}
