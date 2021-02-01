import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddjobComponent } from 'src/app/Adminstration/jobs-crud/addjob/addjob.component';
import { UpdatejobComponent } from 'src/app/Adminstration/jobs-crud/updatejob/updatejob.component';
import { JobService } from 'src/app/Shared/Job/job.service';
import { Router } from '@angular/router';
import { Job } from 'src/app/Shared/Job/job.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-jobs-crud',
  templateUrl: './jobs-crud.component.html',
  styleUrls: ['./jobs-crud.component.css']
})
export class JobsCrudComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: JobService,
    private route: Router , private toaster: ToastrService) { }

    options = { itemsPerPage: 9, currentPage: 1, id: 'pagination', totalItems: 200 }
    DataList: Job[];

    ErrorMessage: string = "";
  ngOnInit(): void {
    this.getAll(this.options.currentPage, 9)
  }

  addJob() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    this.dialog.open(AddjobComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 250);
    });
  }
  UpdateJob(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    dialogConfig.data = { id };
    this.dialog.open(UpdatejobComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 250);
    });
  }

  getAll(pageIndex, pageSize) {
    this.service.GetAllJobs(pageIndex, pageSize).subscribe(
      (data: any) => {
        this.options.totalItems = data.Data.Records;
        this.DataList = data.Data.Result
      },
    )
  }
  getNextPrevData(pageIndex) {

    this.getAll(pageIndex, 9);
    this.options.currentPage = pageIndex;
  }
  OnDelete(id) {
    if (confirm('Are you sure to delete this Job?')) {
      this.service.DeleteJob(id).then((data :any) => {
        if(data.Successed){
        setTimeout(() => {
          this.ngOnInit()
          this.toaster.error('Deleted Successfully', 'Address Book')
        }, 250);
      }
      })
    }
  }

}

