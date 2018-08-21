import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {

  @ViewChild('txrPorcentage') txrPorcentage: ElementRef;

  @Input('name') legend: string = 'Legend';
  @Input() porcentage: number = 50;

  @Output('updateValue') changeVal: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log( this.legend, this.porcentage );
  }

  ngOnInit() {
  }

  onChanges( newValue: number ){
    //let elemHTML: any    = document.getElementsByName('porcentage')[ 0 ];

    if( newValue >= 100 ){
      this.porcentage    = 100;
    } else if( newValue <= 0 ){
      this.porcentage    = 0;
    } else {
      this.porcentage    = newValue;
    }

    //elemHTML.value    = this.porcentage;
    this.txrPorcentage.nativeElement.value    = this.porcentage;

    this.changeVal.emit( this.porcentage );
  }

  changeValue( value: number ){
    this.porcentage    = this.porcentage + value;

    if( this.porcentage > 100 ){
      this.porcentage    = 100;
      return;
    }
    if( this.porcentage <= 0 && value < 0 ){
      this.porcentage    = 0;
      return;
    }

	this.changeVal.emit( this.porcentage );
	
	this.txrPorcentage.nativeElement.focus();
  }

}
