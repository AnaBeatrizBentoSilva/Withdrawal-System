import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ================================
  // AUTENTICAÇÃO
  // ================================

  login(username: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/auth/login`,
      { username, password },
      { headers }
    ).pipe(
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
  // CONTAS
  // ================================

  getAccountsByPerson(personId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts/person/${personId}`);
  }

  deleteAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`);
  }

  // ================================
  // CARTÕES
  // ================================

  getCardsByAccount(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cards/account/${accountId}`);
  }

  deleteCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${cardId}`);
  }

  // ================================
  // OPERAÇÕES
  // ================================

  createOperation(operation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/operations`, operation);
  }

  getOperationsByAccount(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/operations/account/${accountId}`);
  }


}
