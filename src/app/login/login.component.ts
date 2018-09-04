import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function init_jQuery();
declare function init_bootstrap_min();
declare function init_sidebarMenu();
declare function init_stickykitMin();
declare function init_sparkline();
declare function init_perfectScrollbar();
declare function init_plugins();

declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [
	'./login.component.css'
	]
})
export class LoginComponent implements OnInit {

	email: string;
	rememberme: boolean = false;
	auth2: any;

	constructor(
		public router: Router,
		public _userService: UserService
	){ }

	ngOnInit(){
        init_jQuery();
        init_bootstrap_min();
        init_sidebarMenu();
        init_stickykitMin();
        init_sparkline();
        init_perfectScrollbar();
		init_plugins();

		this.googleInit();
		
		this.email = localStorage.getItem('email') || '';
		if( this.email.length > 1 ){
			this.rememberme = true;
		}
	}

	googleInit(){
		gapi.load('auth2', ( ) => {
			this.auth2 = gapi.auth2.init({
				client_id: '465821864949-ivff66vgm40f4he49l7ut35ukoivptg8.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});

            this.attachSignin( document.getElementById('btnGoogle'));
		});
	}

	attachSignin( element ){
		this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
            // let profile = googleUser.getBasicProfile();
            let token = googleUser.getAuthResponse().id_token;
			this._userService.loginGoogle( token )
			.subscribe( resp => {
				//this.router.navigate(['/dashboard']);
				window.location.href = '/#/dashboard';
			});
			console.log( token );
		});
	}

	signUp( form: NgForm ){
		if( form.invalid ){
			return;
		}

		let user = new User( null, form.value.email, form.value.password );

		this._userService.login( user, form.value.rememberme )
		.subscribe( resp => {
			this.router.navigate(['/dashboard']);
		});
	}

}
