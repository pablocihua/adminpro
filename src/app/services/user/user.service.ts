import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: User;
    token: string;

    constructor(
        public http: HttpClient,
        private _router: Router
    ){
        console.log('Service user');
        this.loadStorage();
    }

    isLogged(){
        return ( this.token.length ) ? true : false;
    }

    loadStorage(){
        if( localStorage.getItem('token')){
            this.token = localStorage.getItem('token');
            this.user = JSON.parse( localStorage.getItem('user'));
        } else {
            this.token = '';
            this.user = null;
        }
    }

    saveStorage( id: string, token: string, user: User ){
        localStorage.setItem('id', id );
        localStorage.setItem('token', token );
        localStorage.setItem('user', JSON.stringify( user ));

        this.user = user;
        this.token = token;
    }

    logout(){
        this.token = '';
        this.user = null;

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this._router.navigate(['/login']);
    }

    loginGoogle( token: string ){
        let url = URL_SERVICE + '/login/google';

        return this.http.post( url, { token })
        .pipe( map(( resp: any ) => {
            this.saveStorage( resp.id, resp.token, resp.user );

            return true;
        }));
    }

    login( user: User, remember: boolean = false ){
        if( remember ){
            localStorage.setItem('email', user.email );
        } else {
            localStorage.removeItem('email');
        }

        let url = URL_SERVICE + '/login';
        console.log( user );
        return this.http.post( url, user )
        .pipe( map(( resp: any ) => {
            console.log( resp );
            this.saveStorage( resp.id, resp.token, resp.user );
            // localStorage.setItem('id', resp.id );
            // localStorage.setItem('token', resp.token );
            // localStorage.setItem('user', JSON.stringify( resp.user ));

            return true;
        }));
    }

    createUser( user: User ){
        const url = URL_SERVICE + '/user';

        return this.http.post( url, user )
        .pipe( map(( resp: any ) => {
            swal('Usuario creado', user.email, 'success');
            return resp.user;
        }));
    }

}
