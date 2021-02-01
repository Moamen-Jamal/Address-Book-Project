import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdddepartmentComponent } from 'src/app/Adminstration/departments-crud/adddepartment/adddepartment.component';
import { UpdatedepartmentComponent } from 'src/app/Adminstration/departments-crud/updatedepartment/updatedepartment.component';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/Shared/Department/department.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departments-crud',
  templateUrl: './departments-crud.component.html',
  styleUrls: ['./departments-crud.component.css']
})
export class DepartmentsCrudComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: DepartmentService,
    private route: Router , private toaster: ToastrService) { }
  
    options = { itemsPerPage: 9, currentPage: 1, id: 'pagination', totalItems: 200 }
    DataList: Department[];

    ErrorMessage: string = "";
  ngOnInit(): void {
    this.getAll(this.options.currentPage, 9)
  }

  addDepartment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "30%";
    dialogConfig.height = "40%";
    this.dialog.open(AdddepartmentComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 250);
    });
  }
  UpdateDepartment(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "30%";
    dialogConfig.height = "40%";
    dialogConfig.data = { id };
    this.dialog.open(UpdatedepartmentComponent, dialogConfig).afterClosed().subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 250);
    });
  }

  getAll(pageIndex, pageSize) {
    this.service.GetAllDepartments(pageIndex, pageSize).subscribe(
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
    if (confirm('Are you sure to delete this Department?')) {
      this.service.DeleteDepartment(id).then((data :any) => {
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
