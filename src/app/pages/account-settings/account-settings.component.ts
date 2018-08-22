import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

	constructor(
		public _ajustes: SettingsService
	){ }

	ngOnInit() {
		this.setCheck();
	}

	changeColor( theme: string, link: any ){
		this.applyCheck( link );
		this._ajustes.applyTheme( theme );
	}

	applyCheck( link: any ){
		let selects: any    = document.getElementsByClassName('selector');

		for( let ref of selects ){
			ref.classList.remove('working');
		}

		link.classList.add('working');
	}

	setCheck(){
    	let selectors: any    = document.getElementsByClassName('selector');
    	let theme    = this._ajustes.ajustes.theme;
    
   	    for( let ref of selectors ){
			ref.classList.remove('working');
     	    if( ref.getAttribute('data-theme') === theme ){
				ref.classList.add('working');
				break;
        	}
      	}
    }

}
