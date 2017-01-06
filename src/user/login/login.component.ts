import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { UserService } from '../user.service';

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
		public userService: UserService,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {
	
	}

	// Attempt to login in through our User service
	login() {

		this.userService.login(this.credentials).subscribe(resp => {
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

	}
}
