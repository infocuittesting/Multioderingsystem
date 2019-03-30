import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SinInService} from './sin-in.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-sin-in',
  templateUrl: './sin-in.component.html',
  styleUrls: ['./sin-in.component.scss'],
  providers:[SinInService],
})
export class SinInComponent implements OnInit {
 public book2=false;
 public book1=true;
 public dept:any=[];

  constructor(private router:Router, private signin:SinInService, private storage:LocalStorageService) { }

  ngOnInit() {
  }


  btnClick(param1,param2){
    if(param1!="" && param2!=""){
    let body={
      "employee_email":param1,
    	"login_status_id":2,
    	"emp_password":param2
    }
    this.signin.btnClick(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RIS"){
        console.log(Response)
        this.storage.store("employee_email",param1)
        this.storage.store("emp_password",param2)
        alert("Signin successfully");
        this.router.navigateByUrl('/dashboard');
      }
    });
   
  }
  else{
    alert("empty");
  }
}

select(){
  this.book1=false;
 
    this.book2=true;
  
}
select1(empname,email,mobno,empid,roolid,statusid,psw){
  let body={
    "employee_name":empname,
    "employee_email":email,
    "employee_mobile":mobno,
    "employee_dept_id":empid,
    "employee_role_id":roolid,
    "emp_status_id":1,
    "emp_password":psw
  }
  this.signin.select1(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RIS"){
      alert(Response.Return);
    }
  });
  this.book2=false;
 
    this.book1=true;
  
}

department(){
  this.signin.department().subscribe((Response:any)=>{
    if(Response.ReturnCode== "RRS"){
      this.dept=Response.Returnvalue;
    }
  });
}
}

