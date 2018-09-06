import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: User;
    token: string;

    constructor(
        public http: HttpClient,
        private _router: Router,
        public _uploadService: UploadFileService
    ){
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

        // this._router.navigate(['/login']);
        window.location.href = '/#/login';
    }

    loginGoogle( token: string ){
        let url = URL_SERVICE + '/login/google';

        return this.http.post( url, { token })
        .pipe( map(( resp: any ) => {
            this.saveStorage( resp.id, resp.token, resp.user );
console.log( resp );
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

        return this.http.post( url, user )
        .pipe( map(( resp: any ) => {
            this.saveStorage( resp.id, resp.token, resp.user );

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

    updateUser( user: User ){
        let url = URL_SERVICE + '/user/' + user._id;
        url += '?token=' + this.token;

        return this.http.put( url, user )
        .pipe( map(( resp: any ) => {
            if( user._id === this.user._id ){
                let userDB: User = resp.user;
                this.saveStorage( userDB._id, this.token, userDB );
            }

            swal('Usuario actualizado', user.name, 'success');

            return true;
        }));
    }

    changeImage( file: File, id: string ){
        this._uploadService.uploadFile( file, 'user', id )
        .then(( resp: any ) => {
            this.user.img = resp.user.img;
            swal('Imagen Actualizada', this.user.name, 'success');
            this.saveStorage( id, this.token, this.user );
        })
        .catch( resp => {
            console.log( resp );
        });
    }

    loadUsers( from: number = 0 ){
        const url = URL_SERVICE + '/user?from=' + from;

        return this.http.get( url );
    }

    searchUser( word: string ){
        const url = URL_SERVICE + '/api/search/collection/users/' + word;

        return this.http.get( url )
        .pipe( map(( resp: any ) => resp.users ));
    }

    deleteUser( id: string ){
        let url = URL_SERVICE + '/user/' + id;
        url += '?token=' + this.token;

        return this.http.delete( url )
        .pipe( map(( resp: any ) => {
            swal('Usuario eliminado', 'El usuario ha sido eliminado correctamente', 'success');
            return true;
        }));
    }

}
