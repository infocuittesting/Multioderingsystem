import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { UserProfileService } from './user-profile.service';
import *as moment from 'moment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserProfileService]
})
export class UserProfileComponent implements OnInit {

  constructor(private UserProfileService:UserProfileService) { }

  public getdetails:any;
  public getcolumnchart:any;
  public getcolro:any;
  public getbar:any;
  public getescbar:any;
  public getpie:any;
  public todate = moment().format('YYYY-MM-DD');
  public fromdate = moment().subtract('days', 7).format('YYYY-MM-DD');
  
  ngOnInit() {
    this.submit(this.fromdate,this.todate);
  }
  submit(param1,param2){
    this.UserProfileService.chartservice( param1,param2)
    .subscribe((resp: any) => {
     this.getdetails=resp.Request_based_report;
     this.getcolumnchart=resp.Room_based_report;
     this.getcolro=resp.Dept_based_report;
     this.getbar=resp.Reminder_based_report;
     this.getescbar=resp.Escalation_based_report;
     this.getpie=resp.Device_based_report;
     
     //Request Based Date
     let chart = am4core.create("chartdiv", am4charts.XYChart);
     chart.hiddenState.properties.opacity = 0; 
     
     chart.data = this.getdetails;
     
     chart.colors.step = 2;
     chart.padding(10, 10, 10, 10);
     chart.legend = new am4charts.Legend();
     
     let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = "date";
     categoryAxis.renderer.grid.template.location = 0;
     
     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
     valueAxis.min = 0;
     valueAxis.max = 100;
     valueAxis.strictMinMax = true;
     valueAxis.calculateTotals = true;
     valueAxis.renderer.minWidth = 50;
     
     
     let series1 = chart.series.push(new am4charts.ColumnSeries());
     series1.columns.template.width = am4core.percent(80);
     series1.columns.template.tooltipText =
       "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
     series1.name = "Request Count";
     series1.dataFields.categoryX = "date";
     series1.dataFields.valueY = "request_count";
     series1.dataFields.valueYShow = "totalPercent";
     series1.dataItems.template.locations.categoryX = 0.5;
     series1.stacked = true;
     series1.tooltip.pointerOrientation = "vertical";
     
     let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
     bullet1.interactionsEnabled = false;
     bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
     bullet1.label.fill = am4core.color("#ffffff");
     bullet1.locationY = 0.5;
     
     let series2 = chart.series.push(new am4charts.ColumnSeries());
     series2.columns.template.width = am4core.percent(80);
     series2.columns.template.tooltipText =
       "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
     series2.name = "Complete Count";
     series2.dataFields.categoryX = "date";
     series2.dataFields.valueY = "complete_count";
     series2.dataFields.valueYShow = "totalPercent";
     series2.dataItems.template.locations.categoryX = 0.5;
     series2.stacked = true;
     series2.tooltip.pointerOrientation = "vertical";
     
     let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
     bullet2.interactionsEnabled = false;
     bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
     bullet2.locationY = 0.5;
     bullet2.label.fill = am4core.color("#ffffff");
     chart.scrollbarX = new am4core.Scrollbar();
     
// Room Based Report
let charts = am4core.create("chartcolumn", am4charts.XYChart3D);

charts.data = this.getcolumnchart;

let categoryAxi = charts.xAxes.push(new am4charts.CategoryAxis());
categoryAxi.dataFields.category = "room_no";
categoryAxi.renderer.labels.template.rotation = 270;
categoryAxi.renderer.labels.template.hideOversized = false;
categoryAxi.renderer.minGridDistance = 20;
categoryAxi.renderer.labels.template.horizontalCenter = "right";
categoryAxi.renderer.labels.template.verticalCenter = "middle";
categoryAxi.tooltip.label.rotation = 270;
categoryAxi.tooltip.label.horizontalCenter = "right";
categoryAxi.tooltip.label.verticalCenter = "middle";

let valueAxi = charts.yAxes.push(new am4charts.ValueAxis());
valueAxi.title.text = "Room No";
valueAxi.title.fontWeight = "bold";

let series = charts.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "count";
series.dataFields.categoryX = "room_no";
series.name = "count";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

let columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
columnTemplate.stroke = am4core.color("#FFFFFF");

columnTemplate.adapter.add("fill", (fill, target) => {
  return charts.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", (stroke, target) => {
  return charts.colors.getIndex(target.dataItem.index);
})

charts.cursor = new am4charts.XYCursor();
charts.cursor.lineX.strokeOpacity = 0;
charts.cursor.lineY.strokeOpacity = 0;


// Department Based Report
let chartss = am4core.create("chartcolro", am4charts.XYChart);
chartss.scrollbarX = new am4core.Scrollbar();

chartss.data = this.getcolro;

let categoryAxiss = chartss.xAxes.push(new am4charts.CategoryAxis());
categoryAxiss.dataFields.category = "department_name";
categoryAxiss.renderer.grid.template.location = 0;
categoryAxiss.renderer.minGridDistance = 30;
categoryAxiss.renderer.labels.template.horizontalCenter = "right";
categoryAxiss.renderer.labels.template.verticalCenter = "middle";
categoryAxiss.renderer.labels.template.rotation = 270;
categoryAxiss.tooltip.disabled = true;
categoryAxiss.renderer.minHeight = 110;

let valueAxiss = chartss.yAxes.push(new am4charts.ValueAxis());
valueAxiss.renderer.minWidth = 50;

// Create series
let seriess = chartss.series.push(new am4charts.ColumnSeries());
seriess.sequencedInterpolation = true;
seriess.dataFields.valueY = "count";
seriess.dataFields.categoryX = "department_name";
seriess.tooltipText = "[{categoryX}: bold]{valueY}[/]";
seriess.columns.template.strokeWidth = 0;

seriess.tooltip.pointerOrientation = "vertical";

seriess.columns.template.column.cornerRadiusTopLeft = 10;
seriess.columns.template.column.cornerRadiusTopRight = 10;
seriess.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chartss.colors.getIndex(target.dataItem.index);
});
chartss.cursor = new am4charts.XYCursor();


//Clustered Bar
let char = am4core.create("chartbar", am4charts.XYChart);

// Add data
char.data = this.getbar;
// Create axes
let categorAxis = char.yAxes.push(new am4charts.CategoryAxis());
categorAxis.dataFields.category = "department_name";
categorAxis.numberFormatter.numberFormat = "#";
categorAxis.renderer.inversed = true;
categorAxis.renderer.grid.template.location = 0;
categorAxis.renderer.cellStartLocation = 0.1;
categorAxis.renderer.cellEndLocation = 0.9;

let  valuAxis = char.xAxes.push(new am4charts.ValueAxis()); 
valuAxis.renderer.opposite = true;

// Create series
function createSeries(field, name) {
  let series = char.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "department_name";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  let valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  categoryLabel.label.text = "{name}";
  categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = false;
  categoryLabel.label.truncate = false;
}

createSeries("reminderone", "Reminderone");
createSeries("remindertwo", "Remindertwo");


//Clustered Bar Escalation
let chartt = am4core.create("chartesc", am4charts.XYChart);

// Add data
chartt.data = this.getescbar;
// Create axes
let categoriAxis = chartt.yAxes.push(new am4charts.CategoryAxis());
categoriAxis.dataFields.category = "department_name";
categoriAxis.numberFormatter.numberFormat = "#";
categoriAxis.renderer.inversed = true;
categoriAxis.renderer.grid.template.location = 0;
categoriAxis.renderer.cellStartLocation = 0.1;
categoriAxis.renderer.cellEndLocation = 0.9;

let  valuiAxis = chartt.xAxes.push(new am4charts.ValueAxis()); 
valuiAxis.renderer.opposite = true;

// Create series
function createSeriess(field, name) {
  let series = chartt.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "department_name";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  let valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  categoryLabel.label.text = "{name}";
  categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = false;
  categoryLabel.label.truncate = false;
}

createSeriess("escalationone", "Escalationone");
createSeriess("escalationtwo", "Escalationtwo");


//pie Chart
let chartpie = am4core.create("chartpie", am4charts.PieChart);

// Add data
chartpie.data = this.getpie;
// Add and configure Series
let pieSeries = chartpie.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "count";
pieSeries.dataFields.category = "alexa_app_id";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

    });  
  }

}
