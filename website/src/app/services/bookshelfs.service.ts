import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Library} from "../interfaces/library";

@Injectable({
  providedIn: 'root'
})
export class BookshelfsService {
  _url = "bookshelfs"
  public bookshelf:{idBookshelf:"",rowB:"", columnB:"", name:"", User_idUser:"" }

  constructor(private http : HttpClient) { }

  getLibraries(){
    let header = new HttpHeaders().set("Type-content", "aplication/json")
    return this.http.get(this._url, { headers : header});
  }

  addLibrary(data:Library){
    return this.http.post(this._url, data);
  }
}
