import { Component, OnInit } from '@angular/core';
import { ReminderPerUser } from 'src/app/interfaces/reminder-per-user';
import { RemindersService } from 'src/app/services/reminders.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminders: ReminderPerUser[];

  constructor(private remindersS: RemindersService) { 
    this.remindersS.getReminders().subscribe((resp: any) => {
      this.reminders = resp.data;
      console.log(resp.data);
    });
  }

  ngOnInit(): void {
  }

}
