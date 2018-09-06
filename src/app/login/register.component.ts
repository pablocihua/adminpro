import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as swal from 'sweetalert';
// import swal from 'sweetalert'; // This way also works.
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

// declare var swal: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class RegisterComponent implements OnInit {

    _form: FormGroup;

    constructor(
        public _userService: UserService,
        public _router: Router
    ) { }

    theyAreEquals( field1, field2 ){
        return ( group: FormGroup ) => {
            let pass1 = group.controls[ field1 ].value;
            let pass2 = group.controls[ field2 ].value;

            if( pass1 === pass2 ){
                return null;
            }

            return {
                theyAreEquals: true
            };
        }
    }

    ngOnInit() {
        this._form = new FormGroup({
            name: new FormControl( null, Validators.required ),
            email: new FormControl( null, [ Validators.required, Validators.email ]),
            password: new FormControl( null, Validators.required ),
            password2: new FormControl( null, Validators.required ),
            conditions: new FormControl( false )
        }, {
            validators: this.theyAreEquals( 'password', 'password2' )
        });

        this._form.setValue({
            name: 'Test',
            email: 'test@test.com',
            password: '123456',
            password2: '123456',
            conditions: true
        });
    }

    registerUser(){
        if( this._form.invalid ){
            return;
        }
        if( !this._form.value.conditions ){
            swal('Importante', 'Debe Aceptar las condiciones.', 'warning');
            return;
        }

        // let formValues = [];

        let user = new User(
            this._form.value.name,
            this._form.value.email,
            this._form.value.password
        );

        this._userService.createUser( user )
        .subscribe(( response ) => {
            console.log( response );
            this._router.navigate(['/login']);
        });
    }

}
