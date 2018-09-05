import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';
import { URL_SERVICE } from '../../config/config';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor() { }

    uploadFile( file: File, type: string, id: string ){
        return new Promise(( resolve, reject ) => {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();

            formData.append('image', file, file.name );

            xhr.onreadystatechange = function(){
                if( xhr.readyState === 4 ){
                    if( xhr.status === 200 ){
                        // console.log('Image uploaded!');
                        resolve( JSON.parse( xhr.response ));
                    } else {
                        console.log('Failed upload!');
                        reject( xhr.response );
                    }
                }
            }

            let url = URL_SERVICE + '/api/upload/' + type + '/' + id;

            xhr.open('PUT', url, true );
            xhr.send( formData );
        });
    }
}
