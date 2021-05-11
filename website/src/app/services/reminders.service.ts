import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from "../services/user.service";
import { Reminder } from '../interfaces/reminder';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  _url = "reminders"
  
  constructor(private http : HttpClient, private userService: UserService) { }

  getReminders(){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.get(this._url, { headers : header});
  }

  addReminder(data:Reminder){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.post(this._url, data, { headers : header});
  }

}
