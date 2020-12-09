import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  public date;

  public startTime ;
  public endTime ;
  public disabled = true;
  public disableMinute = false;
  public selectedTime = '10:00';
  public fromTime = '10:00';

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<AddSlotComponent>, private atp: AmazingTimePickerService) { }
  open() {
    const amazingTimePicker = this.atp.open({
        time:  this.data.selectedTime.start,
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
  ngOnInit(): void {
    const dateStr = new Date(this.data.selectedDate).toISOString().split('T').shift();
    const timeStr = this.data.selectedTime;
    this.selectedTime = this.data.selectedTime.start;
    this.fromTime = this.data.selectedTime.start;
    this.endTime = this.data.selectedTime.end;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
