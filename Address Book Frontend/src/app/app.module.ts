import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy , LocationStrategy } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MasterComponent } from './Adminstration/master/master.component';
import { MasteradminComponent } from './MasterModules/admin/masteradmin/masteradmin.component';
import { AdminsCrudComponent } from './Adminstration/admins-crud/admins-crud.component';
import { AdminDetailsComponent } from './Adminstration/admins-crud/admindetailspopup/admin-details/admin-details.component';
import { AddadminComponent } from './Adminstration/admins-crud/addadmin/addadmin.component';
import { UpdateadminComponent } from './Adminstration/admins-crud/updateadmin/updateadmin.component';
import { AdminaccountComponent } from './Adminstration/admins-crud/adminaccount/adminaccount.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './Shared/User/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home/home.component';

import { AuthenticationGuard } from './Guards/authentication.guard';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { DatePipe } from '@angular/common';
import { RatingModule } from 'ng-starrating';
import { UniqueUsernameValidatorDirective } from './Shared/unique-username-validator.directive';
import { UniqueEmailValidatorDirective } from './Shared/unique-email-validator.directive';
import { AddemployeeComponent } from 'src/app/Adminstration/employee-crud/addemployee/addemployee.component';
import { EmployeedetailspopupComponent } from './Adminstration/employee-crud/employeedetailspopup/employeedetailspopup.component';
import { UpdateempolyeeComponent } from './Adminstration/employee-crud/updateempolyee/updateempolyee.component';
import { AdddepartmentComponent } from './Adminstration/departments-crud/adddepartment/adddepartment.component';
import { UpdatedepartmentComponent } from './Adminstration/departments-crud/updatedepartment/updatedepartment.component';
import { DepartmentsCrudComponent } from './Adminstration/departments-crud/departments-crud/departments-crud.component';
import { JobsCrudComponent } from './Adminstration/jobs-crud/jobs-crud.component';
import { AddjobComponent } from './Adminstration/jobs-crud/addjob/addjob.component';
import { UpdatejobComponent } from './Adminstration/jobs-crud/updatejob/updatejob.component';
import { EmployeesCrudComponent } from './Adminstration/employee-crud/employees-crud/employees-crud.component';
//import { AuthInterceptor } from './Guards/auth-interceptor';





@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
   
    MasterComponent,
    MasteradminComponent,
   
    AdminsCrudComponent,
    
    AdminDetailsComponent,
    AddadminComponent,
    UpdateadminComponent,
    
    AdminaccountComponent,
    HomeComponent,
    
    ForbiddenComponent,
    
    SignInComponent,
    
    UniqueUsernameValidatorDirective,
    UniqueEmailValidatorDirective,
    AddemployeeComponent,
    EmployeedetailspopupComponent,
    UpdateempolyeeComponent,
    AdddepartmentComponent,
    UpdatedepartmentComponent,
    DepartmentsCrudComponent,
    JobsCrudComponent,
    AddjobComponent,
    UpdatejobComponent,
    EmployeesCrudComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RatingModule 


  ],
  entryComponents: [ AdminDetailsComponent, AddadminComponent, AdddepartmentComponent,AddjobComponent,
    UpdateadminComponent, EmployeedetailspopupComponent, AddemployeeComponent, UpdateempolyeeComponent
    ,UpdatedepartmentComponent,UpdatejobComponent,AdminaccountComponent],
  providers: [
    UserService,
    AuthenticationGuard,
    DatePipe,
    {provide : LocationStrategy , useClass :HashLocationStrategy}
    //{
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],


  bootstrap: [AppComponent],
  exports: [
    UniqueEmailValidatorDirective,
    UniqueUsernameValidatorDirective
  ]
})
export class AppModule { }
