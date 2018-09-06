import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
    providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router
    ){}

    canActivate( ): Promise<boolean> | boolean {
        let token = this._userService.token,
            payload = JSON.parse( atob( token.split('.')[ 1 ] )),
            expired = this.isExpiration( payload.exp );

        if( expired ){
            this._router.navigate(['/login']);
            return false;
        } else {

        }
console.log('Token guard', payload );

        return this.checkRenew( payload.exp );
    }

    checkRenew( dateExp: number ):  Promise <boolean> {
        return new Promise(( resolve, reject ) => {
            let tokenExp = new Date( dateExp * 1000 ),
                now = new Date();

            now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ));

            console.log( tokenExp, now, ( 300 * 1000 ));
            if( tokenExp.getTime() > now.getTime() ){
                resolve( true );
            } else {
                this._userService
                    .renewToken()
                    .subscribe(
                        () => {
                            resolve( true );
                        },
                        () => {
                            this._router.navigate(['/login']);
                            reject( false );
                        }
                    );
            }
        });
    }

    isExpiration( dateExp: number ){
        let _now = new Date().getTime() / 1000;

        if( dateExp < _now ){
            return true;
        } else {
            return false;
        }
    }

}
