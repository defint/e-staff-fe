import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IEmployee } from "../interfaces/employee";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private backendUrl = "http://localhost:3000/employee";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }

  getEmployeeList(): Observable<IEmployee[]> {
    return this.http
      .get<IEmployee[]>(this.backendUrl, this.httpOptions)
      .pipe(catchError(this.handleError<IEmployee[]>("getEmployeeList", [])));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.backendUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<void>("deleteEmployee")));
  }
}
