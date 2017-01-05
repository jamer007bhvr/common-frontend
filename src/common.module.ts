import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate';
import { Storage } from '@ionic/storage';

import { Logger } from './logger/logger';
import { Api } from './api/api';
import { UserService } from './user/user.service';
import { LoginComponent } from './user/login.component';
import { LogoutComponent } from './user/logout.component';

@NgModule({
	imports: [
		IonicModule,
		TranslateModule,
	],
	declarations: [
		LoginComponent,
		LogoutComponent
	],
	exports: [
		LoginComponent,
		LogoutComponent
	],
	providers: [
		Logger,
		Api,
		UserService,
		Storage,
	],
})
export class CommonModule {}
