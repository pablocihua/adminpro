import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styles: []
})
export class DoctorComponent implements OnInit {
    hospitals: Hospital[] = [];
    doctor: Doctor = new Doctor('', '', '', '');
    hospital: Hospital = new Hospital('');

    constructor(
        private _doctorService: DoctorService,
        private _hospitalService: HospitalService,
        public _router: Router,
        public activatedRoute: ActivatedRoute,
        public _modalUploadService: ModalUploadService
    ) {
        activatedRoute.params.subscribe(( params ) => {
            let id = params['id'];

            if( id !== 'new' ){
                this.loadDoctor( id );
            }

        });
    }

    ngOnInit() {
        this._hospitalService
            .loadHospitals()
            .subscribe(( resp: any ) => this.hospitals = resp.hospitals );

        this._modalUploadService
            .notification
            .subscribe(( resp: any ) => {
                this.doctor.img = resp.doctor.img;
            });
    }

    saveDoctor( f: NgForm ){
        if( f.valid ){
            this._doctorService
                .saveDoctor( this.doctor )
                .subscribe(( doctor: any ) => {
                    this.doctor._id = doctor._id;
                    this._router.navigate(['/doctor', doctor._id ]);
                });
        } else {
            return;
        }
    }

    changeHospital( id: string ){
        this._hospitalService
            .getHospital( id )
            .subscribe( resp => this.hospital = resp.hospital );
    }

    loadDoctor( id: string ){
        this._doctorService
            .getDoctor( id )
            .subscribe( doctor => {
                // let newDoctor = new Doctor();
                this.doctor = doctor;
                this.doctor.hospital_fk = doctor.hospital_fk._id;
                this.changeHospital( this.doctor.hospital_fk );
            });
    }

    changePhoto(){
        this._modalUploadService
            .showModal('doctor', this.doctor._id );
    }

}
