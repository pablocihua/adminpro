import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert';

@Component({
selector: 'app-modal-upload',
templateUrl: './modal-upload.component.html',
styles: []
})
export class ModalUploadComponent implements OnInit {

    imageUpload: File;
    imageTemp: string;

    constructor(
        public _uploadFileService: UploadFileService,
        public _modalUploadService: ModalUploadService
    ){ 
        // console.log('modal listo');
    }

    ngOnInit() {
    }

    uploadImage(){
        this._uploadFileService.uploadFile(
            this.imageUpload,
            this._modalUploadService.type,
            this._modalUploadService.id
        )
        .then( resp => {
            this._modalUploadService.notification.emit( resp );
            this.closeModal();
        })
        .catch( err => {
            console.log('Error en la carga... ')
        });
    }

    closeModal(){
        this.imageTemp = null;
        this.imageUpload = null;

        this._modalUploadService.hideModal();
    }

    selectImage( file: File ){
        if( !file ){
            this.imageUpload = null;
            return;
        }

        if( file.type.indexOf('image') < 0 ){
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imageUpload = null;
            return;
        }

        this.imageUpload = file;

        let reader = new FileReader();
        let urlImageTemp = reader.readAsDataURL( file );

        reader.onloadend = () => this.imageTemp = reader.result;
    }

}
