import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
    constructor(
        public _user: UserService,
        public _router: Router
    ) {

    }

    canActivate() {
        if( this._user.isLogged() ) {

            return true;
        } else {
            this._router.navigate(['/login']);
        }
    }
}