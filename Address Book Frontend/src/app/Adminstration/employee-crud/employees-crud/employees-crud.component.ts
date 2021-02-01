import { Component, OnInit } from '@angular/core';
import { EmployeedetailspopupComponent } from 'src/app/Adminstration/employee-crud/employeedetailspopup/employeedetailspopup.component';
import { MatDialog ,MatDialogConfig } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Shared/Employee/employee.service';
import { Employee } from 'src/app/Shared/Employee/employee.model';
import { environment } from 'src/environments/environment';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
@Component({
  selector: 'app-employees-crud',
  templateUrl: './employees-crud.component.html',
  styleUrls: ['./employees-crud.component.css']
})
export class EmployeesCrudComponent implements OnInit {

  constructor(private dialog :MatDialog , private service :EmployeeService) { }

  options={ itemsPerPage:6, currentPage:1, id :'pagination', totalItems:200 }
    DataList :Employee[];
    url = environment.apiURL
  ErrorMessage :string = "";
  ngOnInit(): void {
    this.getAll(this.options.currentPage,6)
    
  }
  getAll(pageIndex,pageSize){
    this.service.GetAllEmployees(pageIndex,pageSize).subscribe(
      (data:any)=>{
        this.options.totalItems=data.Data.Records;
        this.DataList = data.Data.Result
      },
    )
  }
  
   
  getNextPrevData(pageIndex){
    
    this.getAll(pageIndex,6);
    this.options.currentPage= pageIndex;
  }
  employeedetails(id){
    const  dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true ;
    dialogConfig.disableClose = true ;
    dialogConfig.width = "40%";
    dialogConfig.height="87%";
    dialogConfig.position = {
      top : '55px'
    }
    
    dialogConfig.data = {id}
    localStorage.setItem('employeeID', id)
    this.dialog.open(EmployeedetailspopupComponent ,dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 400);
    });
  }
  addemployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "91%";
    dialogConfig.position = {
      top: '55px'
    }
    this.dialog.open(AddemployeeComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 400);
    });
  }
}