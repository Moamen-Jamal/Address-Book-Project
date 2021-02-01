import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  reqHeader = new HttpHeaders(
    {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json', 
      'Authorization' :'Bearer ' + localStorage.getItem("userToken")
    });
  constructor(private http :HttpClient) { }
  GetAllEmployees(pageIndex:number,pageSize:number){
    return this.http.get(environment.apiURL+`Employee/Get?pageIndex=${pageIndex}&pageSize=${pageSize}`,{headers : this.reqHeader});
  }
  GetEmployeeDetails(id :number){
    return this.http.get(environment.apiURL+"Employee/Get/"+id,{headers : this.reqHeader})
  }
  DeleteEmployee(id :number){
    return this.http.delete(environment.apiURL+"Employee/Delete/"+id,{headers : this.reqHeader})
  }
  AddEmployee(data :any){
    return this.http.post(environment.apiURL+"Employee/Post" , data,{headers : this.reqHeader})
  }
  UpdateEmployee(ID,Data){
    return this.http.put(environment.apiURL+"Employee/Put/"+ID , Data,{headers : this.reqHeader})
  }

  private setHeadersWithImage(): HttpHeaders {
		let headersConfig = {
			'Accept': 'application/json',
			// 'Content-Type' : 'multipart/form-data'
		};
		return new HttpHeaders(headersConfig);
  }
  
  upload( body: Object) {
		return this.http.post(`${environment.apiURL}File/Upload`, body, { headers: this.setHeadersWithImage() });
	}
}
