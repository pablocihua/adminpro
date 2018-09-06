import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { UserService } from "../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate
{
    constructor(
        public _userService: UserService
    ){

    }

    canActivate() {
        if( this._userService.user.role === 'ROLE_ADMIN' ){
            return true;
        } else {
            console.log('No Permission Guard !');
            this._userService.logout();
            return false;
        }
    }
}