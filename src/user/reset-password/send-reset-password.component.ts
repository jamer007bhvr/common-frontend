import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'send-reset-password',
	templateUrl: 'send-reset-password.html',
})
export class SendResetPasswordComponent {

	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);

	submitted: Boolean = false;

	form: FormGroup = this.formBuilder.group({
		email: this.email
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {}

	// Attempt to login in through our User service
	sendResetPassword() {
		const sub = this.api.post('/send-reset-password', this.form.value);
		
		sub.map(res => res.json())
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

		return sub;

	}


	submit() {
		this.submitted = true;
		if (!this.form.valid) return;

		return this.sendResetPassword();
	}
}
