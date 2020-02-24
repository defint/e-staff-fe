import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IOffice } from "../interfaces/office";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class OfficeService {
  private backendUrl = `${environment.backendUrl}/office`;

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

  getOfficeList(): Observable<IOffice[]> {
    return this.http
      .get<IOffice[]>(this.backendUrl, this.httpOptions)
      .pipe(catchError(this.handleError<IOffice[]>("getOfficeList", [])));
  }
}
