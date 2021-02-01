import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Shared/Employee/employee.service';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { JobService } from 'src/app/Shared/Job/job.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/Shared/Department/department.model';
import { Job } from 'src/app/Shared/Job/job.model';
import { Employee } from 'src/app/Shared/Employee/employee.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-updateempolyee',
  templateUrl: './updateempolyee.component.html',
  styleUrls: ['./updateempolyee.component.css']
})
export class UpdateempolyeeComponent implements OnInit {

  url = environment.apiURL;
  ErrorMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public dataemployee, private empolyeeservice: EmployeeService, private departmentService: DepartmentService,
    private jobService: JobService, private toaster: ToastrService, public fb: FormBuilder) { }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^01[0-2||5]{1}[0-9]{8}";
  numberPattern = "[+-]?([0-9]*[.])?[0-9]+";
  characterPattern = "^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$";
  form = this.fb.group({
    fname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.pattern(this.characterPattern)
    ]),
    
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
      // uniqueEmailValidator(this.userService) // async validator
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.phonePattern)
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
      // uniqueUsernameValidator(this.userService) // async validator
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    
    ]),
    governate: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
      Validators.pattern(this.characterPattern)
    ]),
    region: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
      Validators.pattern(this.characterPattern)
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
      Validators.pattern(this.numberPattern),
    ]),


  });
  get governate() {
    return this.form.get('governate')
  }
  ngOnInit(): void {
    this.getemployee()
    
  }
  ID;
  Name;
  UserName;
  Password;
  Email;
  MobilePhone;
  Photo;
  BirthDate;
  Age;
  DepartmentID;
  JobID;
  Governate;
  City;
  Region;
  Street;
  EmployeeID;
  ////////
  DepartmentList: Department[];
  currDepartmentList: Department[];
  JobList: Job[];
  currJobList: Job[];
  currDepartmentID: number;
  currJobID: number;

  files = [];
  onFileChange(event) {
    this.files = event.target.files;
    setTimeout(() => {
      this.upload()
    }, 100);
  }


  upload() {
    let formData: FormData = new FormData();
    for (var j = 0; j < this.files.length; j++) {
      formData.append("file[]", this.files[j], this.files[j].name);
      this.empolyeeservice.upload(formData).subscribe(
        (data: any) => {
          this.employee.Photo = data.Data[0].Path;
        },
        (err) => {
          console.log('err')
        })
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  employee: Employee;
  getemployee() {
    this.empolyeeservice.GetEmployeeDetails(parseInt(localStorage.getItem('employeeID'))).subscribe(
      (data: any) => {
        this.employee = data.Data;

      }
    )
  }

  OnUpdate() {
    this.employee.Address.EmployeeID = this.employee.ID
    
    this.empolyeeservice.UpdateEmployee(parseInt(localStorage.getItem('employeeID')), this.employee).subscribe(
      (data: any) => {
        console.log(data.Data)
      },
      (err) => {
        console.log('err')
      })
  }


  

}
