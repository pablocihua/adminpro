import { Component, OnInit } from '@angular/core';

import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { UserService } from '../../services/user/user.service';

declare var swal: any;

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styles: []
})
export class DoctorsComponent implements OnInit {
    doctors: Doctor[] = [];
    from: number = 0;
    totalRecords: number = 0;
    loading: boolean = false;

    constructor(
        public _doctorService: DoctorService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.loadDoctors();
    }

    loadDoctors(){
        this._doctorService.loadDoctors( this.from )
            .subscribe(( resp: any ) => {
                this.totalRecords = resp.total;
                this.doctors = resp.doctors;
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
        this.loadDoctors();
    }

    searchDoctor( word: string ){
        this.loading = true;
        if( word.length > 0 ){
            this._doctorService.searchDoctor( word )
                .subscribe(( doctors: Doctor[] ) => {
                    this.doctors = doctors;
                    this.loading = false;
                });
        } else {
            this.loadDoctors();
        }

        return;
    }

    deleteDoctor( doctor: Doctor ){
        swal({
            'title': 'Está seguro ?',
            'text': 'Esta apunto de eliminar a ' + doctor.name,
            'icon': 'warning',
            'buttons': true,
            'dangerMode': true
        })
        .then(( del ) => {
            if( del ){
                this._doctorService.deleteDoctor( doctor._id )
                    .subscribe( deleted => this.loadDoctors() );
            }
        });
    }

}
