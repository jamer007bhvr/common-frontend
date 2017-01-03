import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

import { UserService } from './user.service';

@Component({
	selector: 'login-component',
	templateUrl: 'login.html',
})
export class LoginComponent {
	// The account fields for the login form.
	// If you're using the username field with or without email, make
	// sure to add it to the type
	account: { email: string, password: string } = {
		email: 'test@example.com',
		password: 'test',
	};

	// Our translated text strings
	private loginErrorString: string;

	constructor(public navCtrl: NavController,
		public userService: UserService,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {

		this.translateService.get('LOGIN_ERROR').subscribe(value => {
			this.loginErrorString = value;
		});
	}

	// Attempt to login in through our User service
	doLogin() {

		this.userService.login(this.account).subscribe((resp) => {
			logger.info('Logged in');

		}, err => {
			logger.info('NOT Logged in');
			// this.navCtrl.push(MainPage);
			// Unable to log in
			let toast = this.toastCtrl.create({
				message: this.loginErrorString,
				duration: 3000,
				position: 'top',
			});
			toast.present();
		});

	}
}
