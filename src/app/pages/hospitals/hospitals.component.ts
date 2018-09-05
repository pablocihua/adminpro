import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
    selector: 'app-hospitals',
    templateUrl: './hospitals.component.html',
    styles: []
})
export class HospitalsComponent implements OnInit {
    hospitals: Hospital[] = [];
    from: number = 0;
    totalRecords: number = 0;
    loading: boolean = false;

    constructor(
        public _hospitalService: HospitalService,
        public _modalUploadService: ModalUploadService
    ) { }

    ngOnInit() {
        this.loadHospitals();

        this._modalUploadService.notification
        .subscribe( resp => this.loadHospitals() );
    }

    showModal( id: string ){
        this._modalUploadService.showModal( 'hospital', id );
    }

    loadHospitals(){
        this.loading = true;

        this._hospitalService.loadHospitals( this.from )
        .subscribe(( resp: any ) => {
            console.log( resp );
            this.totalRecords = resp.total;
            this.hospitals =  resp.hospitals;
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
        this.loadHospitals();
    }

    searchHospital( word: string ){
        this.loading = true;
        if( word.length > 0 ){
            this._hospitalService.searchHospital( word )
            .subscribe(( hospitals: Hospital[] ) => {
                this.hospitals = hospitals;
                this.loading = false;
            });
        } else {
            this.loadHospitals();
        }
        return;
    }

    deleteHospital( hospital: Hospital ){
        if( hospital._id === this._hospitalService.hospital._id ){
            swal('No puede borrar hospital', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
                "title": 'Está seguro ?',
                "text": 'Esta apunto de eliminar a ' + hospital.email,
                "icon": 'warning',
                "buttons": true,
                "dangerMode": true
            }
        )
        .then(( del )=> {
            if( del ){
                this._hospitalService.deleteHospital( hospital._id )
                .subscribe( deleted => {
                    this.loadHospitals();
                });
            }
        });
    }

    saveHospital( hospital: Hospital ){
        this._hospitalService.updateHospital( hospital )
        .subscribe();
    }

}
