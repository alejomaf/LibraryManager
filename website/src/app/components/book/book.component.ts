import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  private routeSub: Subscription;
  public books: Book[] = []
  private idLibrary;

  constructor(private route: ActivatedRoute, private booksS: BooksService) { 
    this.booksS.getBooks(this.idLibrary).subscribe((resp: any) => {
      this.books = resp.data
    });
  }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']); //log the value of id
      this.idLibrary = params['id'];
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  faStar = faStar;
}
