import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SinInService {

  constructor(private http:Http) { }

  btnClick(signin){
    return this.http.post("https://multi-ordering-system.herokuapp.com/Employee_LoginandLogout",signin)
    .map(this.extractData)
  }
 
  select1(signup){
    return this.http.post("https://multi-ordering-system.herokuapp.com/Employee_Signup_Insert",signup)
    .map(this.extractData)
  }
  
  department(){
    let dep={}
    return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Select_Department",dep)
    .map(this.extractData)
  }

  private extractData(res: Response) {
    return res.json();   
    }

}
