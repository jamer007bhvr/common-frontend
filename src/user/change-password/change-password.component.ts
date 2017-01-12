import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';

@Component({
	selector: 'change-password',
	templateUrl: 'change-password.html',
})
export class ChangePasswordComponent {
    oldPassword: FormControl = new FormControl('aaaa', [Validators.required])
    newPassword1: FormControl = new FormControl('bbbb', [Validators.required, Validators.minLength(4)])
    newPassword2: FormControl = new FormControl('bbbb', [Validators.required])

    form: FormGroup = this.formBuilder.group({
        oldPassword: this.oldPassword,
        newPassword1: this.newPassword1,
        newPassword2: this.newPassword2,
    }, { validator: this.areEqual('newPassword1', 'newPassword2') });

    areEqual(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            const password = group.controls[passwordKey];
            const passwordConfirm = group.controls[passwordConfirmationKey];

            if (password.value !== passwordConfirm.value) {
                return passwordConfirm.setErrors({areEqual: true})
            }
        };
    }

	constructor(private formBuilder: FormBuilder, public api: Api) { }

	changePassword() {

        if(!this.form.valid) return;
        
        // console.log(this.form.value);
        const { oldPassword, newPassword1 } = this.form.value;
        
		this.api.post('/change-password', { oldpassword: oldPassword, newPassword: newPassword1 })
			.subscribe(resp => {
				logger.log(resp);

			}, e => {
				logger.error(e)
			});
	}
}
