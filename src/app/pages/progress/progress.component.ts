import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public porcentage1: number = 20;
  public porcentage2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  /* update( event: number ){
    console.log( event )
    this.porcentage1 = event;
  } */
 

}
