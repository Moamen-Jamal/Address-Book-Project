import { Component, Inject, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatedepartment',
  templateUrl: './updatedepartment.component.html',
  styleUrls: ['./updatedepartment.component.css']
})
export class UpdatedepartmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private service: DepartmentService, private toaster: ToastrService) { }

  oldName;
  ngOnInit(): void {
    this.getByID()
  }

  getByID() {
    this.service.GetDepartmentDetails(this.data.id).subscribe(
      (data: any) => {
        this.oldName = data.Data.Name
      }
    )
  }

  Name;
  OnUpdate() {
    let Data = {
      ID: this.data.id,
      Name: this.Name
    };
    this.service.UpdateDepartment(this.data.id, Data).subscribe(
      (data: any) => {
        this.toaster.success('Updated Successfully', 'Address Book')
      }
    )
  }

}
