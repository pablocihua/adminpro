import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'; // retry

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    public subscription: Subscription;

    constructor( ){
        this.subscription    = this.returnObservable()
        // .pipe(
        //     retry( 2 )
        // )
        .subscribe(
            number => console.log('Number ', number ),
            error => console.log('Error en el obs ', error ),
            () => console.log('El observado termino ' )
        );
    }

    ngOnInit() {
    }

    ngOnDestroy(){
        console.log('La página se va a cerrar');
        this.subscription.unsubscribe();
    }

    returnObservable(): Observable<  any  > {
        return new Observable(( observer: Subscriber< any > ) => {
            let counter    = 0;
            const interval    = setInterval( () => {
                counter ++;
                const output = {
                    value: counter
                }
                observer.next( output );

                // if( counter === 3 ){
                //     clearInterval( interval );
                //     observer.complete();
                // }
                // if( counter === 2 ){
                //     // clearInterval( interval );
                //     observer.error('Auxilio');
                // }

            }, 1000 );
        })
        .pipe(
            map( resp => resp.value ),
            filter(( value, index ) => {
                let _return    = false;
                if(( value % 2 ) === 1 ){
                    _return    = true;
                } else {
                    // The result is false.
                }
                // console.log('Filter', value, index );
                return _return;
            })
        );
    }

}
