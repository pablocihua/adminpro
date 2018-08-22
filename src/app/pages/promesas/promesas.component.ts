import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promesas',
    templateUrl: './promesas.component.html',
    styles: []
})
export class PromesasComponent implements OnInit {

    constructor( ){
        this.countThree()
        .then(
            ( msg ) => console.log('Termino ', msg)
        ).catch(
            error => console.log('Error en la promesa ', error )
        );
    }

    ngOnInit() {
    }

    countThree(): Promise<boolean> {
        return new Promise(( resolve, reject ) => {
            let counter     = 0,
                interval    = setInterval(( ) => {
                counter += 1;
                console.log( counter );
                if( counter === 3 ){
                    resolve('Ok!');
                    // reject('Un simple error');
                    clearInterval( interval );
                }
            }, 1000 );
        });
    }

}
