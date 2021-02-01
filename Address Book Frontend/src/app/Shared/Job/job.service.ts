import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  reqHeader = new HttpHeaders(
    {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json', 
      'Authorization' :'Bearer ' + localStorage.getItem("userToken")
    });

  constructor(private http :HttpClient) { }
  GetJobs(){
    return this.http.get(environment.apiURL+`Job/GetAll`,{headers : this.reqHeader});
  }
  GetAllJobs(pageIndex:number,pageSize:number){
    return this.http.get(environment.apiURL+`Job/Get?pageIndex=${pageIndex}&pageSize=${pageSize}`,{headers : this.reqHeader});
  }
  GetJobDetails(id :number){
    return this.http.get(environment.apiURL+"Job/Get/"+id,{headers : this.reqHeader})
  }
  DeleteJob(id :number){
    return this.http.delete(environment.apiURL+"Job/Delete/"+id,{headers : this.reqHeader}).toPromise();
  }
  AddJob(data :any){
    return this.http.post(environment.apiURL+"Job/Post" , data,{headers : this.reqHeader})
  }
  UpdateJob(ID,Data){
    return this.http.put(environment.apiURL+"Job/Put/"+ID , Data,{headers : this.reqHeader})
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
