import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TableListService {

  constructor(private http:Http) { }


// ******************Alexa Configurations************************************
Insert_Alexa(insert){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Insert_Alexa_With_Department",insert)
  .map(this.extractData)
}

Update_Alexa(update){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Update_Alexa_With_Department",update)
  .map(this.extractData)
}

Select_Alexa(){
  let select={}
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Select_Alexa_With_Department",select)
  .map(this.extractData)
}

Delete_Alexa(delet){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Delete_Alexa_With_Department",delet)
  .map(this.extractData)
}


// *****************************  Department  **********************************
Insert_dep(insert){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Insert_Department",insert)
  .map(this.extractData)
 }

Update_dep(update){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Update_Department",update)
  .map(this.extractData)
}

Select_Dep(){
  let select={}
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Select_Department",select)
  .map(this.extractData)
 }

 Delete_Dep(delet){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Delete_Department",delet)
  .map(this.extractData)
 }
 

//  **************************  Items  *****************************************
Insert_Item(insert){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Insert_Items",insert)
  .map(this.extractData)
 }

Select_Item(){
  let select={}
  return this.http.get("https://multi-ordering-system.herokuapp.com/Configure_Select_Items",select)
  .map(this.extractData)
 }

Update_Item(update){
  return this.http.post("https://multi-ordering-system.herokuapp.com/Configure_Update_Items",update)
  .map(this.extractData)
}

Delete_Item(delet){
  return this.http.delete("https://multi-ordering-system.herokuapp.com/Configure_Select_Items:param",delet)
  .map(this.extractData)
}

private extractData(res: Response) {
  return res.json();   
  }
}


