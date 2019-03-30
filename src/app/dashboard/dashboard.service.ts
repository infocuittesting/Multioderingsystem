import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http:Http,private storage:LocalStorageService) { }
  Getfrontdesk(){
    return this.http.get('https://multi-ordering-system.herokuapp.com/Query_Request')
    .map(this.extractData)
  }
  
  getdepartment(param,param1){
    let body={
      "from_date":param,
      "to_date":param1
    }
    return this.http.post('https://multi-ordering-system.herokuapp.com/Query_Between_Date_Record',body)
    .map(this.extractData)
  }

  Updateticket(param){
    let body={
      "ticket_no":param,
      "employee_email":this.storage.retrieve("employee_email")
    }
    return this.http.put('https://multi-ordering-system.herokuapp.com/Raise_Request',body)
    .map(this.extractData)
  }
  private extractData(res: Response) {
    return res.json();   
    }
}
