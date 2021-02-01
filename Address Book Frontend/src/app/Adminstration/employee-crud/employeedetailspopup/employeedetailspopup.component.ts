import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateempolyeeComponent } from 'src/app/Adminstration/employee-crud/updateempolyee/updateempolyee.component';
import { Employee } from 'src/app/Shared/Employee/employee.model';
import { EmployeeService } from 'src/app/Shared/Employee/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employeedetailspopup',
  templateUrl: './employeedetailspopup.component.html',
  styleUrls: ['./employeedetailspopup.component.css']
})
export class EmployeedetailspopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataemployee,
  private service: EmployeeService, private dialog: MatDialog, private router: Router
  , private toaster: ToastrService) { }

  Data: Employee;
  url = environment.apiURL
  ErrorMessage: string;
  ngOnInit(): void {
    this.GetDetails();
  }
  GetDetails() {
    this.service.GetEmployeeDetails(this.dataemployee.id).subscribe(
      (data: any) => {
        this.Data = data.Data;
      }
    )
  }

  OnDelete() {
    if (confirm('Are you sure to delete this Employee?')) {
      if (localStorage.getItem('userID') == this.dataemployee.id) {
        this.service.DeleteEmployee(this.dataemployee.id).subscribe(
          (data: any) => {

            if (data.Successed) {
              localStorage.removeItem('userToken')
              this.router.navigate(['/Login'])
            }

          }
        )
      } else {
        this.service.DeleteEmployee(this.dataemployee.id).subscribe(
          (data: any) => {
            if (data.Successed) {
              this.toaster.error('Deleted Successfully', 'Address Book')
            }
          }
        )
      }
    }
  }

  updateEmployee(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "42%";
    dialogConfig.height = "90%";
    dialogConfig.position = {
      top: '50px'
    }

    dialogConfig.data = { id }
    this.dialog.open(UpdateempolyeeComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 250);
    });
  }
}
