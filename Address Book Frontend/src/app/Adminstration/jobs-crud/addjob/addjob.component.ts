import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/Shared/Job/job.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/Shared/Department/department.model';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {

  constructor(private service: JobService, private toaster: ToastrService,
    private departmentService: DepartmentService,public fb: FormBuilder) { }

    form = this.fb.group({ 
      department: new FormControl('', Validators.required)
    });
    get department() {
      return this.form.get('department')
    }
  
  ngOnInit(): void {
    this.getDepartment();
  }

  Name;
  DepartmentID;
  DepartmentList: Department[];
  currDepartmentID: number;
  
  OnAdd() {
    let Data = {
      ID: 0,
      Name: this.Name,
      DepartmentID: this.currDepartmentID
    };
    this.service.AddJob(Data).subscribe(
      (data: any) => {
        if(data.Successed){
        Data = data
        this.toaster.success('Added Successfully', 'Address Book')
        }
      },
    )
  }
  getDepartment() {
    this.departmentService.GetDepartments().subscribe(
      (data: any) => { this.DepartmentList = data.Data }
    )
  }
  getDepartmnetID(name: any): void {
    this.currDepartmentID = this.DepartmentList.find(x => x.Name == name)?.ID;
  }
}
