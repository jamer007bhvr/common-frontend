import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Api } from '../../api/api';

@Component({
	selector: 'edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfileComponent {

	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;

	form: FormGroup = this.formBuilder.group({
		firstName: this.firstName,
		lastName: this.lastName
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public toastCtrl: ToastController,
		public translateService: TranslateService,
		public userService: UserService) {}

	// Attempt to login in through our User service
	editProfile() {
		const sub = this.api.put('/user', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.translateService.get('EDIT_PROFILE_SUCCESS').subscribe(message => {
					this.toastCtrl.create({
						message: message,
						duration: 3000,
						position: 'top',
					}).present();
				});

				this.userService.user = res.user;

			}, err => {
				this.translateService.get('EDIT_PROFILE_ERROR').subscribe(message => {
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

		return this.editProfile();
	}
}
