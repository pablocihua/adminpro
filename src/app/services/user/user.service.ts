import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    

    constructor(
        public http: HttpClient
    ){
        console.log('Service user');
    }

    login( user: User, remember: boolean = false ){
        if( remember ){
            localStorage.setItem('email', user.email );
        } else {
            localStorage.removeItem('email');
        }

        let url = URL_SERVICE + '/login';

        return this.http.post( url, user )
        .pipe( map(( resp: any ) => {
            localStorage.setItem('id', resp.id );
            localStorage.setItem('token', resp.token );
            localStorage.setItem('user', JSON.stringify( resp.user ));

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
