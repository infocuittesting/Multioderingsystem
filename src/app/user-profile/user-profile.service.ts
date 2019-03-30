import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:Http) { }
  chartservice(param1,param2){
    let body={
      "datefrom":param1,
      "dateto":param2
    }
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
console.log("test",body)
    return this.http.post('https://multi-ordering-system.herokuapp.com/Query_Multi_Ordring_System_Report',body,options)
    .map(this.extractData)
  }

  private extractData(res: Response) {
    return res.json();   
    }
}
