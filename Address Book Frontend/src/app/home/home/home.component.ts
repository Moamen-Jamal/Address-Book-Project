import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog ,MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/Shared/User/user.service';
import { Router } from '@angular/router';
import { FormBuilder ,FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { Employee } from 'src/app/Shared/Employee/Employee.model';
import { EmployeeService } from 'src/app/Shared/Employee/employee.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private dialog :MatDialog , 
  private router :Router ,private employeeService: EmployeeService,   public fb: FormBuilder,
  private userService :UserService ) { }
 
  ngOnInit(): void {
    
    this.getUser()
    
  }
 

    
  user : User ;
  getUser(){
    if(localStorage.getItem('userToken')!= null){
    this.userService.getUser(parseInt(localStorage.getItem('userID'))).subscribe(
      (data :any)=>{
        this.user = data.Data
      }
    )
    }
  }
  

  
  employee :Employee 
  getEmployee(){
    if(localStorage.getItem('userToken')!= null){
    this.employeeService.GetEmployeeDetails(parseInt(localStorage.getItem('userID'))).subscribe(
      (data:any)=>{
        this.employee = data.Data;
      }
    )}
  }



  LogOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.router.navigate(['/Login']);
    
  }
  
  
  Login(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.router.navigate(['/Login']);
  }
  
  
}
