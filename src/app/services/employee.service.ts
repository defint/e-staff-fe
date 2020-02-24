import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IEmployee } from "../interfaces/employee";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ITag } from "../interfaces/tag";
import { IStat } from "../interfaces/stat";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private backendUrl = `${environment.backendUrl}/employee`;

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

  getEmployee(id: string): Observable<IEmployee> {
    return this.http
      .get<IEmployee>(`${this.backendUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<IEmployee>("getEmployee", {} as IEmployee))
      );
  }

  getStat(): Observable<IStat> {
    return this.http
      .get<IStat>(`${this.backendUrl}/stat`, this.httpOptions)
      .pipe(catchError(this.handleError<IStat>("getEmployee", {} as IStat)));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.backendUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<void>("deleteEmployee")));
  }

  createOrUpdateEmployee(id, employee): Observable<IEmployee> {
    const body = { ...employee, phone: employee.phone.replace("+", "") };

    if (id) {
      return this.http
        .put<IEmployee>(`${this.backendUrl}/${id}`, body, this.httpOptions)
        .pipe(
          catchError(
            this.handleError<IEmployee>(
              "createOrUpdateEmployee",
              {} as IEmployee
            )
          )
        );
    } else {
      return this.http
        .post<IEmployee>(this.backendUrl, body, this.httpOptions)
        .pipe(
          catchError(
            this.handleError<IEmployee>(
              "createOrUpdateEmployee",
              {} as IEmployee
            )
          )
        );
    }
  }

  addTag(employeeId, tagLabel) {
    const body = { label: tagLabel };

    return this.http
      .post<ITag>(
        `${this.backendUrl}/${employeeId}/tag`,
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<ITag>("addTag", {} as ITag)));
  }

  deleteTag(employeeId, tagId) {
    return this.http
      .delete<IEmployee>(
        `${this.backendUrl}/${employeeId}/tag/${tagId}`,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError<IEmployee>("deleteTag", {} as IEmployee))
      );
  }
}
