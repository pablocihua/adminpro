import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {
    user: User;

    constructor(
        public _userService: UserService,
        private _route: Router
    ) {
    }

    ngOnInit() {
        this.user = this._userService.user;
    }

    searching( word: string ){
        this._route.navigate(['/searching', word ]);
    }

}
