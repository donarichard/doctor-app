import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSlotComponent } from 'src/app/components/add-slot/add-slot.component';
import { EVENING_SHIFT, MORNING_SHIFT } from 'src/app/constant';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  title = 'doctor-app';
  selectedDate: any;
  list = MORNING_SHIFT
  eveningList = EVENING_SHIFT
  eveningTime = null
  selectedTime = null
  onSelect(event) {
    this.selectedDate = event;
  }
  morningShift() {
    if(!this.selectedTime){
      return this._snackBar.open('Please select the valid time', '', {
        duration: 500,
      });
    }
    this.dialog.open(AddSlotComponent, {
      disableClose: true,
      data: {
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime
      }
    });
  }
  eveningShift() {
    if(!this.eveningTime){
      return this._snackBar.open('Please select the valid time', '', {
        duration: 500,
      });
    }
    this.dialog.open(AddSlotComponent, {
      disableClose: true,
      data: {
        selectedDate: this.selectedDate,
        selectedTime: this.eveningTime
      }
    });
  }
  ngOnInit(): void {
    this.selectedDate = new Date()
  }
}

