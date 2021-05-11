import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/interfaces/book';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  private routeSub: Subscription;
  name= new FormControl("");
  author= new FormControl("");
  number= new FormControl("");
  alertMessage= "";
  idLibrary;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private booksS: BooksService) { 
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']); //log the value of id
      this.idLibrary = params['id'];
    });
    console.log(this.idLibrary);
  }

  createBook(){
    if(this.name.value==""){
      this.alertMessage = "Write the book name";
      return;
    }
    if(this.author.value==""){
      this.alertMessage = "Write the book author";
      return;
    }
    if(this.number.value==""){
      this.alertMessage = "Write the book number";
      return;
    } 
    let book: Book={author:this.author.value, pages:this.number.value, stars:0, title: this.name.value, toRead:0,Bookshelf_idBookshelf:this.idLibrary};
    this.booksS.addBook(book).subscribe((resp:any)=>{this.alertMessage=resp.message; this.reiniciarAtributos();});
  }

  ngOnInit(): void {
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  faPlus = faPlus;

  reiniciarAtributos(){
    this.name= new FormControl("");
    this.author= new FormControl("");
    this.number= new FormControl("");
  }

  
}
