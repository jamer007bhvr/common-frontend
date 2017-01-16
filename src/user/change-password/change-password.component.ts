import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'change-password',
	templateUrl: 'change-password.html',
})
export class ChangePasswordComponent {
	oldPassword: FormControl = new FormControl('', [Validators.required]);
	newPassword1: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	newPassword2: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;

	form: FormGroup = this.formBuilder.group({
		oldPassword: this.oldPassword,
		newPassword1: this.newPassword1,
		newPassword2: this.newPassword2,
	}, { validator: GlobalValidator.areEqual('newPassword1', 'newPassword2') });

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {}

	changePassword() {

		this.submitted = true;
		
		if (!this.form.valid) return;
		
		// console.log(this.form.value);
		const { oldPassword, newPassword1 } = this.form.value;
		
		this.api.post('/change-password', { oldpassword: oldPassword, newpassword: newPassword1 })
			.subscribe(resp => {
				this.translateService.get('CHANGE_PASSWORD_SUCCESS').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});

			}, e => {
				this.translateService.get('CHANGE_PASSWORD_ERROR').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});
				logger.error(e);
			});
	}
}
