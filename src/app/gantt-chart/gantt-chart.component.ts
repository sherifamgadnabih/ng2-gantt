import { Component, OnInit, Input } from '@angular/core';
import { Gantt } from "./ganttModel"

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {

  private _gantt: Gantt;
  constructor() {
  }

  @Input('gantt') set gantt(gantt) {
    this._gantt = gantt;
    this.calculateGantt(this._gantt)
    console.log(gantt)
  }

  //Bar1
  color1: string = "#d9ecc3";
  position1: string = '';
  width1: string = '';

  //Bar2
  color2: string = "#7fbe35";
  position2: string = '';
  width2: string = '';

  //Bar3
  color3: string = "#cfcfcf";
  position3: string = '';
  width3: string = '';

  //Bar4
  color4: string = "#ababab";
  position4: string = '';
  width4: string = '';

  StartProgress: number = 0;
  EndProgress: number = 0;

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {

    //Calculated Bar1
    if (gannt.StartPlannedDay > gannt.StartActualDay) {
      this.width1 = this.getPositionPercentage(gannt.StartPlannedDay - gannt.StartActualDay);
      this.position1 = this.getPositionPercentage(gannt.StartActualDay);
      this.StartProgress = gannt.StartPlannedDay;
    }
    else {
      this.width1 = this.getPositionPercentage(gannt.StartActualDay - gannt.StartPlannedDay);
      this.position1 = this.getPositionPercentage(gannt.StartPlannedDay);
      this.StartProgress = gannt.StartActualDay;
    }

    //Calculated Bar2 progress 
    this.position2 = this.getPositionPercentage(this.StartProgress);
    this.width2 = gannt.Progress.toString() + '%';


    //Calculated Bar3
    this.position3 = this.getPositionPercentage(this.StartProgress + parseInt(gannt.Progress.toString()));
    this.width3 = '5%'

    //Case Forcast
    if (gannt.ForcastDay > 0) {
      this.position4 = this.getPositionPercentage(gannt.EndPlannedDay);
      this.width4 = this.getPositionPercentage(gannt.ForcastDay - gannt.EndPlannedDay);

      console.log('forcast case ')
      console.log('ForcastDay ', gannt.ForcastDay)
      console.log('EndPlannedDay ', gannt.EndPlannedDay)

    }


    console.log('position2', this.position2)
    console.log('width2 ', this.width2)
    console.log('width3 ', this.width3)
    console.log('  this.StartProgress ',   this.StartProgress)
    console.log('gannt.Progress ', gannt.Progress)




  }

  getPositionPercentage(position: number): string {
    return ((position * 100) / 365).toString() + '%';
  }


}
