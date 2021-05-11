import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';
import { ReminderCreateComponent } from '../reminder-create/reminder-create.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() rcc: ReminderCreateComponent;

  private routeSub: Subscription;
  public books: Book[] = []
  private idLibrary;
  dateReminder = new FormControl("");
  alertMessage="";

  constructor(private route: ActivatedRoute, private booksS: BooksService,private modalService: NgbModal) { 
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']); //log the value of id
      this.idLibrary = params['id'];
    });
    this.booksS.getBooks(this.idLibrary).subscribe((resp: any) => {
      this.books = resp.data;
      console.log(resp.data);
    });
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  faStar = faStar;

  openReminderCustomClass(content, idBook) {
    this.modalService.open(content, { windowClass: "dark-modal" });
    console.log(idBook);
    console.log("hola");
  }
  
}
