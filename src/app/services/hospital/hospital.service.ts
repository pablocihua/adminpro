import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
    hospital: Hospital;
    token: string;

    constructor(
        public http: HttpClient,
        private _router: Router,
        public _uploadService: UploadFileService
    ){
        
    }

    createHospital( hospital: Hospital ){
        const url = URL_SERVICE + '/api/hospital';

        return this.http.post( url, hospital )
        .pipe( map(( resp: any ) => {
            swal('Hospital creado', hospital.name, 'success');
            return resp.hospital;
        }));
    }

    updateHospital( hospital: Hospital ){
        let url = URL_SERVICE + '/api/hospital/' + hospital._id;
        url += '?token=' + this.token;

        return this.http.put( url, hospital )
        .pipe( map(( resp: any ) => {
            if( hospital._id === this.hospital._id ){
                let userDB: Hospital = resp.hospital;
                //this.saveStorage( userDB._id, this.token, userDB );
            }

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
        let url = URL_SERVICE + '/api/hospital?from=' + from;

        return this.http.get( url );
    }

    searchHospital( word: string ){
        let url = URL_SERVICE + '/api/search/collection/users/' + word;

        return this.http.get( url )
        .pipe( map(( resp: any ) => resp.users );
    }

    deleteHospital( id: string ){
        let url = URL_SERVICE + '/hospital/' + id;
        url += '?token=' + this.token;

        return this.http.delete( url )
        .pipe( map(( resp: any ) => {
            swal('Hospital eliminado', 'El hospital ha sido eliminado correctamente', 'success');
            return true;
        }));
    }

}
