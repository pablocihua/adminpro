import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
    name: 'image'
})
export class ImagePipe implements PipeTransform {

    transform( image: any, type: string = 'user' ): any {
        let url = URL_SERVICE + '/api/image/';

        if( !image ){
            return url + 'user/xxx';
        }

        if( image.indexOf('https') >= 0 ){
            return image;
        }

        url += `${ type.toLowerCase() }/${ image }`;

        return url;
    }

}
