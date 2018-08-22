import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_jQuery();
declare function init_bootstrap_min();
declare function init_sidebarMenu();
declare function init_stickykitMin();
declare function init_sparkline();
declare function init_perfectScrollbar();
declare function init_plugins();

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [
	'./login.component.css'
	]
})
export class LoginComponent implements OnInit {

	constructor(
		public router: Router
	){ }

	ngOnInit(){
        init_jQuery();
        init_bootstrap_min();
        init_sidebarMenu();
        init_stickykitMin();
        init_sparkline();
        init_perfectScrollbar();
        init_plugins();
	}

	signUp(){
		this.router.navigate(['/dashboard']);
	}

}
