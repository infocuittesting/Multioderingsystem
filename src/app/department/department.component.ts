import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor(private storage: LocalStorageService, private DashboardService: DashboardService) { }

  public Department: any = [];department:any=[];
  public getDepartment:any =[];
  public tog: boolean = false;
  public compreq: any = [];
  public req: any = [];
  public fromdate: any;
  public todate: any;
  public checkdept: any;

  ngOnInit() {
    this.checkdept = (this.storage.retrieve("boundValue"));
    this.fromdate = (this.storage.retrieve("fromdate"));
    this.todate = (this.storage.retrieve("todate"));

    this.getdep();
  }

  select(details) {
    this.DashboardService.Updateticket(details.ticket_no)
      .subscribe((resp: any) => {
       if(resp.ReturnCode=="RUS"){
         alert("The ticket has been Completed");
        this.getdep();
       }
      });
  }
getdep(){
  this.compreq=[];
  this.req=[];
  this.DashboardService.getdepartment(this.fromdate, this.todate)
  .subscribe((resp: any) => {
    this.getDepartment = resp.Returnvalue;
    for (var j=0; j < this.getDepartment.length; j++) {
      console.log("testttttt", this.getDepartment[j].department_name)
      if (this.getDepartment[j].department_name == this.checkdept) {
          this.Department.push(this.getDepartment[j]);              
        for (var i = 0; i < this.getDepartment[j].details.length; i++) {
          if (this.getDepartment[j].details[i].request_status == "COMPLETED") {
            this.compreq.push(this.getDepartment[j].details[i])
          } else {
            this.req.push(this.getDepartment[j].details[i])
            console.log(this.req);
          }
        }
        console.log("completed status********",this.compreq);
        console.log("request status********",this.req);

      }
    }
  });
}
}
