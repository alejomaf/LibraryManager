import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BookshelfsService } from '../services/bookshelfs.service';

@Component({
  selector: 'app-library-create',
  templateUrl: './library-create.component.html',
  styleUrls: ['./library-create.component.css']
})
export class LibraryCreateComponent implements OnInit {

  constructor(private modalService: NgbModal, private bookshelfs: BookshelfsService) {
    this.bookshelfs.getPersonas().subscribe(resp=>{console.log(resp)});
  }

  ngOnInit(): void {
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  faPlus = faPlus;
}
