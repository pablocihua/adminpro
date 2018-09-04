import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(
    @Inject( DOCUMENT ) private _document,

  ) {
	  this.loadAjustes();
  }

  saveAjustes(){
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  loadAjustes(){
    if( localStorage.getItem('ajustes')){
      this.ajustes    = JSON.parse( localStorage.getItem('ajustes'));
      this.applyTheme( this.ajustes.theme );
    } else {
      // Values by default.
	    this.applyTheme( this.ajustes.theme );
    }
  }

  applyTheme( theme: string ){
    let url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', url );

    this.ajustes.theme       = theme;
    this.ajustes.themeUrl    = url;

    this.saveAjustes();
  }

  applyCheck( link: any ){
    let selectors: any    = document.getElementsByClassName('selector');

    for( let ref of selectors ){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}

interface Ajustes {
  themeUrl: string;
  theme: string;
};
