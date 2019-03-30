import { Component, OnInit } from '@angular/core';
import { DashboardService} from './dashboard.service';
import {Router}from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import *as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit {

  constructor( private DashboardService:DashboardService,private route:Router,private storage:LocalStorageService) { }
  
  public getdetails:any;
  public Department:any;
  public searchdata:any;
  public todate = moment().format('YYYY-MM-DD');
  public fromdate = moment().subtract('days', 2).format('YYYY-MM-DD');

  test(param){
    param;
    this.storage.store('boundValue', param);
    this.route.navigate['/department']
  }
  ngOnInit() {

    this.DashboardService.Getfrontdesk()
    .subscribe((resp: any) => {
     this.getdetails=resp.Returnvalue;
     console.log("testttttt",this.getdetails)
   });

   this.getdept(this.fromdate,this.todate);
  }
  
getdept(param,param1){
  this.storage.store('fromdate',param)
  this.storage.store('todate',param1)
  this.DashboardService.getdepartment(param,param1)
  .subscribe((resp: any) => {
   this.Department=resp.Returnvalue;
   console.log("testttttt",this.Department)
 });
}
}
