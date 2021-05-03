import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookshelfsService {
  _url = "bookshelfs"
  constructor(private http : HttpClient) { }

  getPersonas(){
    let header = new HttpHeaders().set("Type-content", "aplication/json")

    return this.http.get(this._url, { headers : header});
  }
}
