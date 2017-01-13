import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { Api } from '../../api/api';

@Component({
	selector: 'send-reset-password',
	templateUrl: 'send-reset-password.html',
})
export class SendResetPasswordComponent {
	credentials: { email: string } = {
		email: 'theo.mathieu1@gmail.com',
	};

	constructor(
		public api: Api,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {
	
	}

	// Attempt to login in through our User service
	sendResetPassword() {

		this.api.post('/send-reset-password', { email: this.credentials.email })
			.subscribe(resp => {
				this.translateService.get('SEND_RESET_PASSWORD_SUCCESS').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});
				logger.log(resp);

			}, err => {
				this.translateService.get('SEND_RESET_PASSWORD_ERROR').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});
			});

	}
}
