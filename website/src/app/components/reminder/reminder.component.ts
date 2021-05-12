import { Component, OnInit } from '@angular/core';
import { ReminderPerUser } from 'src/app/interfaces/reminder-per-user';
import { BooksService } from 'src/app/services/books.service';
import { RemindersService } from 'src/app/services/reminders.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminders: ReminderPerUser[]=[];

  constructor(private remindersS: RemindersService, private booksS: BooksService) { 
    this.remindersS.getReminders().subscribe((resp: any) => {
      this.reminders = resp.data;
      console.log(resp.data);
    });
  }

  deleteReminder(){

  }

  markAsRead(idBook, book){
    book.toRead=1;
    if(confirm("Are you sure to read the book: "+book.title+"?")) {
      this.booksS.updateBook(idBook,book).subscribe((resp: any) => {
        console.log(resp);
      });
    }
  }

  ngOnInit(): void {
  }

}
