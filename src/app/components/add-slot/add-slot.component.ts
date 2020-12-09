import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { AppointmentService } from 'src/app/services/appointment.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  public date;

  public startTime;
  public endTime;
  public disabled = true;
  public disableMinute = false;
  public selectedTime;
  public selectedFromTime;
  public fromTime ;
  patientName = '';
  reason = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    public appointment: AppointmentService, @Inject(MAT_DIALOG_DATA)
    public data,
    private dialogRef: MatDialogRef<AddSlotComponent>,
    private _snackBar: MatSnackBar,
    private atp: AmazingTimePickerService) { }
  open() {
    const amazingTimePicker = this.atp.open({
      time: this.data.selectedTime.start,
      rangeTime: {
        start: this.data.selectedTime.start,
        end: this.data.selectedTime.end
      },
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
  from_Time(){
    const amazingTimePicker = this.atp.open({
      time: this.data.selectedTime.start,
      rangeTime: {
        start: this.data.selectedTime.start,
        end: this.data.selectedTime.start
      },
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedFromTime = time;
    });
  }
  ngOnInit(): void {
    console.log(this.data);
    this.selectedTime = this.data.selectedTime.start;
    this.fromTime = this.data.selectedTime.start;
    this.endTime = this.data.selectedTime.end;
    this.selectedFromTime =  this.data.selectedTime.start
  }
  closeDialog() {
    this.dialogRef.close();
  }
  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  bookNow() {
    if (this.patientName.length === 0 || this.reason.length === 0) {
      return this._snackBar.open('Please select the valid input', '', {
        duration: 500,
      });
    }
    console.log(this.selectedTime)
    const fromTimeValue = new Date(this.formatDate(this.data.selectedDate));
    console.log(fromTimeValue, this.data.selectedDate);
    fromTimeValue.setHours(Number(this.selectedFromTime.split(':')[0]), Number(this.selectedFromTime.split(':')[1]));
    fromTimeValue.toDateString();
    const endTimeValue = new Date(this.data.selectedDate);
    endTimeValue.setHours(Number(this.selectedTime.split(':')[0]), Number(this.selectedTime.split(':')[1]));
    endTimeValue.toISOString();
    let minutes = new Date( endTimeValue).getMinutes() - new Date( fromTimeValue).getMinutes();
    if (minutes >= 30) {
      return this._snackBar.open('Please select between 30 minutes', '', {
        duration: 3000,
      });
    }
    const booking = {
      bookingDate: this.formatDate(this.data.selectedDate),
      name: this.patientName,
      reason: this.reason,
      startTime: fromTimeValue,
      endTime: endTimeValue
    };

    this.appointment.bookAppointment(booking).subscribe((res) => {
      this.dialogRef.close();
      return this._snackBar.open('successfull got appointment', '', {
        duration: 3000,
      });
    }, (err) => {
      return this._snackBar.open(err.error.error, '', {
        duration: 3000,
      });
    });
  }
}
