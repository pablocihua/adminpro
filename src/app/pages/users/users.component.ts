import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styles: []
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    from: number = 0;
    totalRecords: number = 0;
    loading: boolean = false;

    constructor(
        public _userService: UserService,
        public _modalUploadService: ModalUploadService
    ) { }

    ngOnInit() {
        this.loadUSers();

        this._modalUploadService.notification
        .subscribe( resp => this.loadUSers() );
    }

    showModal( id: string ){
        this._modalUploadService.showModal( 'user', id );
    }

    loadUSers(){
        this.loading = true;

        this._userService.loadUsers( this.from )
        .subscribe(( resp: any ) => {
            console.log( resp );
            this.totalRecords = resp.total;
            this.users =  resp.users;
            this.loading = false;
        });
    }

    changeFrom( value: number ){
        let from = this.from + value;
        if( from >= this.totalRecords ){
            return;
        }
        if( from < 0 ){
            return;
        }

        this.from  += value;
        this.loadUSers();
    }

    searchUser( word: string ){
        this.loading = true;
        if( word.length > 0 ){
            this._userService.searchUser( word )
            .subscribe(( users: User[] ) => {
                this.users = users;
                this.loading = false;
            });
        } else {
            this.loadUSers();
        }
        return;
    }

    deleteUser( user: User ){
        if( user._id === this._userService.user._id ){
            swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
                "title": 'Está seguro ?',
                "text": 'Esta apunto de eliminar a ' + user.email,
                "icon": 'warning',
                "buttons": true,
                "dangerMode": true
            }
        )
        .then(( del )=> {
            if( del ){
                this._userService.deleteUser( user._id )
                .subscribe( deleted => {
                    this.loadUSers();
                });
            }
        });
    }

    saveUser( user: User ){
        this._userService.updateUser( user )
        .subscribe();
    }

}
