import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert';

import { map } from 'rxjs/operators';

import { URL_SERVICE } from '../../config/config';
import { Doctor } from '../../models/doctor.model';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    doctor: Doctor;

    constructor(
        private http: HttpClient,
        private _userService: UserService
    ) { }

    loadDoctors( from: number = 0 ){
        const url = URL_SERVICE + '/api/doctor?from=' + from;

        return this.http.get( url );
    }

    getDoctor( id: string ){
        const url = URL_SERVICE + '/api/doctor/' + id;

        return this.http.get( url )
        .pipe( map(( resp: any ) => resp.doctor ));
    }

    searchDoctor( word: string ){
        const url = URL_SERVICE + '/api/search/collection/doctor/' + word;

        return this.http.get( url )
            .pipe( map(( resp: any ) => resp.doctors ));
    }

    saveDoctor( doctor: Doctor ){
        let url = URL_SERVICE + '/api/doctor-',
            token = '?token=' + this._userService.token,
            method: string = '',
            action: string = '';

        if( doctor._id ){
            method = 'put';
            action = 'Actualizado';
            url += 'update/' + doctor._id + token;
        } else {
            method = 'post';
            action = 'Creado';
            url += 'register' + token;
        }

        return this.http
            [ method ]( url, doctor )
            .pipe( map(( resp: any ) => {
                swal(`Doctor ${ action }`, doctor.name, 'success');
                return resp.doctor;
            }));
    }

    deleteDoctor( id: string ){
        let url = URL_SERVICE + '/api/doctor/' + id;
        url += '?token=' + this._userService.token;

        return this.http
            .delete( url )
            .pipe( map(( resp: any ) => {
                swal('Doctor eliminado', 'El doctor ha sido eliminado correctamente', 'success');
                return resp;
            }));
    }
}
