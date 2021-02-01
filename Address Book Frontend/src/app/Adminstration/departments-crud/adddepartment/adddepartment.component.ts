import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/Shared/Department/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.css']
})
export class AdddepartmentComponent implements OnInit {

  constructor(private service: DepartmentService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }
  Name;
  OnAdd() {
    let Data = {
      ID: 0,
      Name: this.Name
    };
    this.service.AddDepartment(Data).subscribe(
      (data: any) => {
        if(data.Successed){
        Data = data
        this.toaster.success('Added Successfully', 'Address Book')
        }
      },
    )
  }
}

