import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './book/book.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BookCalendarComponent } from './book-calendar/book-calendar.component';
import { LibraryCreateComponent } from './library-create/library-create.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LibraryComponent,
    BookComponent,
    BookCalendarComponent,
    LibraryCreateComponent,
    BookCreateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BookCalendarComponent]
})
export class AppModule { }
