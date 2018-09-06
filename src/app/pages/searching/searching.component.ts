import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
    selector: 'app-searching',
    templateUrl: './searching.component.html',
    styles: []
})
export class SearchingComponent implements OnInit {
    users: User[] = [];
    doctors: Doctor[] = [];
    hospitals: Hospital[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        activatedRoute.params
        .subscribe( params => {
            let word = params['word'];
            this.searching( word );
        });
    }

    ngOnInit() {
    }

    searching( word: string ){
        let url = URL_SERVICE + '/api/search/' + word;

        this.http.get( url )
        .subscribe(( resp: any ) => {
            console.log( resp );
            this.hospitals = resp.hospitals;
            this.doctors = resp.doctors;
            this.users = resp.users;
        });
    }

}
