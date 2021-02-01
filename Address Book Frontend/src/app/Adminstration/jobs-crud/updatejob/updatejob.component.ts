import { Component, Inject, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/Shared/Job/job.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/Shared/Department/department.model';
import { Job } from 'src/app/Shared/Job/job.model';
@Component({
  selector: 'app-updatejob',
  templateUrl: './updatejob.component.html',
  styleUrls: ['./updatejob.component.css']
})
export class UpdatejobComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private departmentservice: DepartmentService, private jobService: JobService,
  private toaster: ToastrService, public fb: FormBuilder) { }

  characterPattern = "^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$";

  form = this.fb.group({ 
    department: new FormControl('', Validators.required)
  });
  get department() {
    return this.form.get('department')
  }

  oldName;
  DepartmentID;
  DepartmentList: Department[];
  currDepartmentList: Department[];
  currDepartmentID: number;
  ngOnInit(): void {
    this.getByID()
    this.getDepartment()
    setTimeout(() => {
    this.currDepartmentID = this.job.DepartmentID;
    this.DepartmentName = this.DepartmentList.find(x => x.ID == this.currDepartmentID)?.Name;
    }, 500);
  }
  job: Job;
  DepartmentName;
  getByID() {
    this.jobService.GetJobDetails(this.data.id).subscribe(
      (data: any) => {
        this.job = data.Data;
        this.oldName = data.Data.Name
      }
    )
  }

  Name;
  OnUpdate() {
    this.job.DepartmentID = this.currDepartmentID
    this.jobService.UpdateJob(this.job.ID, this.job).subscribe(
      (data: any) => {
        this.toaster.success('Updated Successfully', 'Address Book')
      }
    )
  }
  getDepartment() {
    this.departmentservice.GetDepartments().subscribe(
      (data: any) => { this.DepartmentList = data.Data }
    )
  }
  getDepartmentID(name): void {
    this.currDepartmentID = this.DepartmentList.find(x => x.Name == name)?.ID;
    this.DepartmentName = this.DepartmentList.find(x => x.Name == name)?.Name;
  }
}
