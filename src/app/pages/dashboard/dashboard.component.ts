import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [ 'Patient', 'Reason','Appointment','Appointment_At' ];
  dataSource;
  count;
  constructor( public appointment: AppointmentService,  private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.appointment.getAppointment().subscribe((res: any) => {
      this.dataSource =   res.appointment
      this.count = res.count
    }, (err) => {
      return this._snackBar.open(err.error.error, '', {
        duration: 3000,
      });
    });
      }


}
