import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  reqHeader = new HttpHeaders(
    {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json', 
      'Authorization' :'Bearer ' + localStorage.getItem("userToken")
    });
  constructor(private http :HttpClient) { }
  
  GetAllDepartments(pageIndex:number,pageSize:number){
    return this.http.get(environment.apiURL+`Department/Get?pageIndex=${pageIndex}&pageSize=${pageSize}`,{headers : this.reqHeader});
  }
  GetDepartments(){
    return this.http.get(environment.apiURL+"Department/GetAll",{headers : this.reqHeader})
  }
  GetDepartmentDetails(id :number){
    return this.http.get(environment.apiURL+"Department/Get/"+id,{headers : this.reqHeader})
  }
  DeleteDepartment(id :number){
    return this.http.delete(environment.apiURL+"Department/Delete/"+id,{headers : this.reqHeader}).toPromise();
  }
  AddDepartment(data :any){
    return this.http.post(environment.apiURL+"Department/Post" , data,{headers : this.reqHeader})
  }
  UpdateDepartment(ID,Data){
    return this.http.put(environment.apiURL+"Department/Put/"+ID , Data,{headers : this.reqHeader})
  }
}
