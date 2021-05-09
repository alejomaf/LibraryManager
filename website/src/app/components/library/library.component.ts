import { Component, OnInit } from '@angular/core';
import { BookshelfsService } from '../../services/bookshelfs.service';
import { Library } from "../../interfaces/library"

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public libraries: Library[] = []

  constructor(private bookshelfs: BookshelfsService) {
    this.bookshelfs.getLibraries().subscribe((resp: any) => {
      console.log(resp);
      this.libraries = resp.data
    });
   }

  ngOnInit(): void {
  }

}
