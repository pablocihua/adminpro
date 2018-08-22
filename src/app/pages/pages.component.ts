import { Component, OnInit } from '@angular/core';

declare function init_jQuery();
declare function init_bootstrap_min();
declare function init_sidebarMenu();
declare function init_stickykitMin();
declare function init_sparkline();
declare function init_perfectScrollbar();
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    init_jQuery();
    init_bootstrap_min();
    init_sidebarMenu();
    init_stickykitMin();
    init_sparkline();
    init_perfectScrollbar();
    init_plugins();
  }

}
