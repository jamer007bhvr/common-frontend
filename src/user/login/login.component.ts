import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { UserService } from '../user.service';
import { Api } from '../../api/api';

@Component({
	selector: 'login-component',
	templateUrl: 'login.html',
})
export class LoginComponent {
	credentials: { email: string, password: string } = {
		email: 'admin@gmail.com',
		password: 'aaaa',
	};

	constructor(
		public api: Api,
		public userService: UserService,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {
	
	}

	// Attempt to login in through our User service
	login() {
		const seq = this.api.post('/login', this.credentials);
		
		seq
			.map(res => res.json())
			.subscribe(res => {
				this.userService.loggedIn(res);
				// redirect ?
				// this.navCtrl.push(MainPage);

			}, err => {
				this.translateService.get('LOGIN_ERROR').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});
			});

		return seq;

	}
}
