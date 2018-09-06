import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

import swal from 'sweetalert';

import { map, catchError } from 'rxjs/operators';
// import { throw } from 'rxjs/observable/throw';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: User;
    token: string;
    menu: any[] = [];

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
            this.menu = JSON.parse( localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.user = null;
            this.menu = [];
        }
    }

    saveStorage( id: string, token: string, user: User, menu: any ){
        localStorage.setItem('id', id );
        localStorage.setItem('token', token );
        localStorage.setItem('user', JSON.stringify( user ));
        localStorage.setItem('menu', JSON.stringify( menu ));

        this.user = user;
        this.token = token;
        this.menu = menu;
    }

    logout(){
        this.token = '';
        this.user = null;
        this.menu = [];

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('menu');

        this._router.navigate(['/login']);
        // window.location.href = '/#/login';
    }

    loginGoogle( token: string ){
        let url = URL_SERVICE + '/login/google';

        return this.http.post( url, { token })
        .pipe( map(( resp: any ) => {
            this.saveStorage( resp.id, resp.token, resp.user, resp.menu );

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
        .pipe(
            map(( resp: any ) => {
                this.saveStorage( resp.id, resp.token, resp.user, resp.menu );

                return true;
            }),
            catchError( this.handleError('Error en el login', [] ))
            /* catchError( err => {
                swal('Error en el login', err.error.message, 'error');
                throw( err );
            }) */
        );
    }

    createUser( user: User ){
        const url = URL_SERVICE + '/user';

        return this.http.post( url, user )
        .pipe(
            map(( resp: any ) => {
                swal('Usuario creado', user.email, 'success');
                return resp.user;
            }),
            catchError( this.handleError('Creando Usuario', [] ))
            /* catchError( err => {
                swal( err.error.message, err.error.errors.message, 'error');
                throw( err );
            }) */
        );
    }

    updateUser( user: User ){
        let url = URL_SERVICE + '/user/' + user._id;
        url += '?token=' + this.token;

        return this.http.put( url, user )
        .pipe(
            map(( resp: any ) => {
                if( user._id === this.user._id ){
                    let userDB: User = resp.user;
                    this.saveStorage( userDB._id, this.token, userDB, this.menu );
                }

                swal('Usuario actualizado', user.name, 'success');

                return true;
            }),
            catchError( this.handleError('Actualizando Usuario', [] ))
            /* catchError( err => {
                swal( err.error.message, err.error.errors.message, 'error');
                throw( err );
            }) */
        );
    }

    changeImage( file: File, id: string ){
        this._uploadService.uploadFile( file, 'user', id )
        .then(( resp: any ) => {
            this.user.img = resp.user.img;
            swal('Imagen Actualizada', this.user.name, 'success');
            this.saveStorage( id, this.token, this.user, this.menu );
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

    renewToken(){
        let url = URL_SERVICE + '/login/renewtoken';
            url += '?token=' + this.token;

        return this.http.get( url )
            .pipe(
                map(( resp: any ) => {
                    this.token = resp.token;

                    this.saveStorage( this.user._id, this.token, this.user, this.menu );
                }),
                catchError( err => {
                    this._router.navigate(['/login']);
                    swal('No fue posible actualizar sessión', 'Intente acceder de nuevo por favor!', 'error');
                    return Observable.throw( err );
                })
            );
    }

    private handleError<T> ( operation = 'operation', result?: T ){
        return ( error: any ): Observable< T > => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            let msg = '';
            if( error.error.errors ){
                msg = error.error.errors.message;
                operation = error.error.message;
            } else {
                msg = error.error.message;
            }
            swal( operation, msg, 'error');
            // Let the app keep running by returning an empty result.
            return of( result as T );
        };
    }
}
