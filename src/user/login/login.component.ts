import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'login-component',
	templateUrl: 'login.html',
})
export class LoginComponent {

	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	password: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

	submitted: Boolean = false;

	form: FormGroup = this.formBuilder.group({
		email: this.email,
		password: this.password
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public toastCtrl: ToastController,
		public translateService: TranslateService,
		public userService: UserService) {}

	// Attempt to login in through our User service
	login() {
		const sub = this.api.post('/login', this.form.value);
		
		sub.map(res => res.json())
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

		return sub;

	}


	submit() {
		this.submitted = true;
		if (!this.form.valid) return;

		return this.login();
	}
}
