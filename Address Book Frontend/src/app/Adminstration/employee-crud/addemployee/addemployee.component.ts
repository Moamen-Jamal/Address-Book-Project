import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Shared/Employee/employee.service';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { JobService } from 'src/app/Shared/Job/job.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/Shared/Department/department.model';
import { Job } from 'src/app/Shared/Job/job.model';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  url = environment.apiURL;

  constructor(private empolyeeservice: EmployeeService, private departmentService: DepartmentService,
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
    department: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
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
    this.getJob()
    this.getDepartment()
    
  }
  ID;
  Name;
  Email;
  UserName;
  Password;
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
    }, 150);

  }

  upload() {
    let formData: FormData = new FormData();
    for (var j = 0; j < this.files.length; j++) {
      formData.append("file[]", this.files[j], this.files[j].name);
      this.empolyeeservice.upload(formData).subscribe(
        (data: any) => {
          this.Photo = data.Data[0].Path;
        }
      )
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  OnAdd() {

    let Data = {
      ID: 0,
      Name: this.Name,
      Email: this.Email,
      UserName: this.UserName,
      Password: this.Password,
      MobilePhone: this.MobilePhone,
      Photo: this.Photo,
      BirthDate: this.BirthDate,
      Age: this.Age,
      DepartmentID: this.currDepartmentID,
      JobID: this.currJobID,
      Address: {
        ID: 0,
        Governate: this.Governate,
        City: this.City,
        Region: this.Region,
        Street: this.Street,
        EmployeeID: 0

      }
    };
    this.empolyeeservice.AddEmployee(Data).subscribe(
      (data: any) => {
        Data = data
        if (data.Successed) {
          this.toaster.success('Added Successfully', 'Address Book')
        }
      }
    )
  }
getJob() {
    this.jobService.GetJobs().subscribe(
      (data: any) => { this.JobList = data.Data }
    )
  }
  getDepartment() {
    this.departmentService.GetDepartments().subscribe(
      (data: any) => { this.DepartmentList = data.Data }
    )
  }
  
  getDepartmentID(name: any): void {
    this.currDepartmentID = this.DepartmentList.find(x => x.Name == name)?.ID;
    this.currJobList = this.JobList.filter(i => i.DepartmentID == this.currDepartmentID)
  }
  getJobID(name: any): void {
    this.currJobID = this.currJobList.find(x => x.Name == name)?.ID;
  }
  callAll() {
    this.upload();
    this.OnAdd()
  }
}
