import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-button',
  templateUrl: './library-button.component.html',
  styleUrls: ['./library-button.component.css']
})
export class LibraryButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 faPlus = faPlus;
}
