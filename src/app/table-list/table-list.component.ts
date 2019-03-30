import { Component, OnInit } from '@angular/core';
import { TableListService} from './table-list.service';
import { Router } from '@angular/router';
// import { config } from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers:[TableListService]
})
export class TableListComponent implements OnInit {
  public selecttable:any=[];
  public deplists:any=[];
  public conlists:any=[];


  public alxappid:string;
  public rooid:any;
  public alaxaid:any;

  public depid:any;
  public depcode:any;
  public depname:any;

  public itid:any;
  public itname:any;
  public itcode:any;
  public createrid:any;
  public departmentid:any;

  constructor(private router:Router, private config:TableListService,private storage:LocalStorageService) { }

  ngOnInit() {

  this.Select_Alexa();
  this.Select_Dep();
  this.Select_con();
  }


  // **************************  Alexa  ******************************************
  Insert_Alexa(param1,param2){
    let body={
      alexa_app_id:param1,
      room_id:param2
    }

    this.config.Insert_Alexa(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RIS"){
        alert(Response.Return);
        this.config.Select_Alexa().subscribe((Response:any)=>{
          console.log("select",Response)
          if(Response.ReturnCode=="RRS"){
            this.selecttable=Response.Returnvalue;
          }
        });
      }
    });
  }
 
  updatebutton(param){
    this.alxappid=param.alexa_app_id;
    this.alaxaid=param.config_alexa_id;
    this.rooid=param.room_id;
  }

  Update_Alexa(param1,param2,param3){
    let body={
      "config_alexa_id":param1,
	    "alexa_app_id":param2,
    	"room_id":param3
    }
    this.config.Update_Alexa(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RUS"){
        alert(Response.Return);
        this.config.Select_Alexa().subscribe((Response:any)=>{
          console.log("select",Response)
          if(Response.ReturnCode=="RRS"){
            this.selecttable=Response.Returnvalue;
          }
        });
      }
    });
  }

 Select_Alexa(){
    this.config.Select_Alexa().subscribe((Response:any)=>{
      console.log("select",Response)
      if(Response.ReturnCode=="RRS"){
        this.selecttable=Response.Returnvalue;
      }
    });
   
  }
  

delbutton(param){
  this.alxappid=param.alexa_app_id;
  this.alaxaid=param.config_alexa_id;
}

Delete_Alexa(param){
    let body={
      "config_alexa_id":param
    }
console.log("delete",param)
    this.config.Delete_Alexa(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RDS"){
        alert(Response.Return);
        this.config.Select_Alexa().subscribe((Response:any)=>{
          console.log("select",Response)
          if(Response.ReturnCode=="RRS"){
            this.selecttable=Response.Returnvalue;
          }
        });
      }
    })
  }



// ***************************************  Department  **********************************

Insert_dep(param){
    let body={
      department_name:param
 
    }
    this.config.Insert_dep(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RIS"){
     alert(Response.Return);
     this.config.Select_Dep().subscribe((Response:any)=>{
      if(Response.ReturnCode=="RRS"){
        this.deplists=Response.Returnvalue;
      }
    });
      }
    });
}

Select_Dep(){
  this.config.Select_Dep().subscribe((Response:any)=>{
    if(Response.ReturnCode=="RRS"){
      this.deplists=Response.Returnvalue;
    }
  });
 }

 editdep(parm){
   this.depid=parm.department_id;
   this.depname=parm.department_name;
 }

 Update_dep(parm1,parm2){
   let body={
    "department_id":parm1,
    "department_name":parm2
   }
   this.config.Update_dep(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RUS"){
      alert(Response.Return);
      this.config.Select_Dep().subscribe((Response:any)=>{
        if(Response.ReturnCode=="RRS"){
          this.deplists=Response.Returnvalue;
        }
      });
    }
   });
   }

  deldep(parm){
    this.depid=parm.department_id;
    this.depname=parm.department_name;
  }
   
  Delete_Dep(parm){
    let body={
      "department_id":parm
    }
    this.config.Delete_Dep(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RDS"){
        alert(Response.Return);
        this.config.Select_Dep().subscribe((Response:any)=>{
          if(Response.ReturnCode=="RRS"){
            this.deplists=Response.Returnvalue;
          }
        });
      }
    });
  }

// ****************************************  Items  ***********************
public IN;
Insert_con(IN){
  if(this.IN !="" ){
    let body={
      "item_name":IN,
      "respective_dept_id":800,
      "item_created_by_id":this.storage.retrieve("employee_email")
 
    }
 
    this.config.Insert_Item(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RIS"){
     alert(Response.Return);
     this.config.Select_Item().subscribe((Response:any)=>{
      if(Response.ReturnCode=="RRS"){
        this.conlists=Response.Returnvalue;
      }
    });
      }
    });
  }
 }

Select_con(){
  this.config.Select_Item().subscribe((Response:any)=>{
    if(Response.ReturnCode=="RRS"){
      this.conlists=Response.Returnvalue;
    }
  });
 }

edititem(parm){
  this.itid=parm.item_code;
  this.itname=parm.item_name;
  this.createrid=this.storage.retrieve("employee_email");
  this.departmentid=parm.respective_dept_id;
}

Update_con(param1,param2,param3,param4){
  let body={
    "item_name":param1,
	  "respective_dept_id":param2,
	  "item_created_by_id":param3,
	  "item_code":param4
  }
  console.log("body is",body)
  this.config.Update_Item(body).subscribe((Response:any)=>{
    console.log("abcv")
    if(Response.ReturnCode=="RUS"){
      alert(Response.Return);
      this.config.Select_Item().subscribe((Response:any)=>{
        if(Response.ReturnCode=="RRS"){
          this.conlists=Response.Returnvalue;
        }
      });
    }
  })
}

item(param){
  this.itid=param.item_code;
  this.itname=param.item_name;
}

Delete_Item(param){
   let body={
    "item_code":param
   }
   console.log("delete",param)
   this.config.Delete_Item(body).subscribe((Response:any)=>{
     console.log("asdf")
    if(Response.ReturnCode=="RDS"){
      console.log("werew")
      alert(Response.Return);
      this.config.Select_Item().subscribe((Response:any)=>{
        if(Response.ReturnCode=="RRS"){
          this.conlists=Response.Returnvalue;
        }
      });
    }
   });
 }
}
