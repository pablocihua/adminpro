import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Hospital } from '../../models/hospital.model';
import { URL_SERVICE } from '../../config/config';

import { UploadFileService } from '../upload-file/upload-file.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
    hospital: Hospital;

    constructor(
        public http: HttpClient,
        private _router: Router,
        public _uploadService: UploadFileService,
        private _userService: UserService
    ){

    }

    createHospital( name: string ){
        let url = URL_SERVICE + '/api/hospital-register';
        url += '?token=' + this._userService.token;

        return this.http.post( url, { name })
        .pipe( map(( resp: any ) => {
            swal('Hospital creado', name, 'success');
            return resp.hospital;
        }));
    }

    updateHospital( hospital: Hospital ){
        let url = URL_SERVICE + '/api/hospital-update/' + hospital._id;
        url += '?token=' + this._userService.token;

        return this.http.put( url, hospital )
            .pipe( map(( resp: any ) => {

                swal('Hospital actualizado', hospital.name, 'success');

                return true;
            }));
    }

    changeImage( file: File, id: string ){
        this._uploadService
        .uploadFile( file, 'hospital', id )
        .then(( resp: any ) => {
            this.hospital.img = resp.hospital.img;
            swal('Imagen Actualizada', this.hospital.name, 'success');
            //this.saveStorage( id, this.token, this.hospital );
        })
        .catch( resp => {
            console.log( resp );
        });
    }

    loadHospitals( from: number = 0 ){
        const url = URL_SERVICE + '/api/hospital?from=' + from;

        return this.http.get( url );
    }

    getHospital( id: string ){
        const url = URL_SERVICE + '/api/hospital/' + id;

        return this.http.get( url )
        .pipe( map(( resp: any ) => resp ));
    }

    searchHospital( word: string ){
        let url = URL_SERVICE + '/api/search/collection/hospitals/' + word;

        return this.http.get( url )
        .pipe( map(( resp: any ) => resp.hospitals ));
    }

    deleteHospital( id: string ){
        let url = URL_SERVICE + '/api/hospital-delete/' + id;
        url += '?token=' + this._userService.token;

        return this.http.delete( url )
        .pipe( map(( resp: any ) => {
            swal('Hospital eliminado', 'El hospital ha sido eliminado correctamente', 'success');
            return true;
        }));
    }

}
