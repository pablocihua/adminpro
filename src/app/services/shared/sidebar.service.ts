import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class SidebarService {

menu: any = [
	{
		title: 'Principal',
		icon: 'mdi mdi-gauge',
		submenu: [
			{ title: 'Dashboard', url: '/dashboard'},
			{ title: 'ProgressBar', url: '/progress'},
			{ title: 'Gráficas', url: '/graficas1'},
			{ title: 'Promesas', url: '/promises'},
			{ title: 'Rxjs', url: '/rxjs'}
		]
	}, {
		title: 'Mantenimiento',
		icon: 'mdi mdi-folder-lock-open',
		submenu: [
			{ title: 'Usuarios', url: '/users'},
			{ title: 'Hospitales', url: '/hospitals'},
			{ title: 'Doctores', url: '/doctors'}
		]
	}
]

	constructor() { }

}
