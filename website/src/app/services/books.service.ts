import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Book} from "../interfaces/book";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _url = "books"
  
  constructor(private http : HttpClient, private userService: UserService) { }

  getBooks(idLibrary){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken(), 'idBookshelf': idLibrary}));
    return this.http.get(this._url, { headers : header});
  }

  addBook(data:Book){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.post(this._url, data, { headers : header});
  }
}
