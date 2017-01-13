import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate';
import { Storage } from '@ionic/storage';

import { Logger } from './logger/logger';
import { Api } from './api/api';
import { FormErrorComponent } from './form/form-error.component';

import { UserService } from './user/user.service';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { SendResetPasswordComponent } from './user/reset-password/send-reset-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

@NgModule({
	imports: [
		IonicModule,
		TranslateModule,
	],
	declarations: [
		LoginComponent,
		LogoutComponent,
		SendResetPasswordComponent,
		ChangePasswordComponent,
		FormErrorComponent,
	],
	exports: [
		LoginComponent,
		LogoutComponent,
		SendResetPasswordComponent,
		ChangePasswordComponent,
		FormErrorComponent,
	],
	providers: [
		Logger,
		Api,
		UserService,
		Storage,
	],
})
export class CommonModule {}
