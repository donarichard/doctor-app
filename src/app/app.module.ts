import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule,MatRadioGroup } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSlotComponent } from './components/add-slot/add-slot.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './middleware/interceptor';
import { HttpClientModule } from '@angular/common/http';
const materialModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatDividerModule,
  MatTabsModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule
];
@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    DashboardComponent,
    AddSlotComponent,
    DatePickerComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AmazingTimePickerModule,
    ...materialModules,
  ],
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
