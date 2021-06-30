import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()

export class ApiService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get(url:string): Promise<any> {
    return this.http.get(url, this.getHeaders()).toPromise()
  }

  post(url:string, body:any): Promise<any> {
    return this.http.post<any>(url, body, this.getHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    ).toPromise()
  }

  handleError(error:any) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error);
  }

  getHeaders() {

    return this.httpOptions
  }
}
