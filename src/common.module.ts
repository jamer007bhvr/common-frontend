import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate';

import { Logger } from './logger/logger';
import { Api } from './api/api';
import { UserService } from './user/user.service';
import { LoginComponent } from './user/login.component';

@NgModule({
	imports: [
		IonicModule,
		TranslateModule,
	],
	declarations: [
		LoginComponent,
	],
	exports: [
		LoginComponent,
	],
	providers: [
		Logger,
		Api,
		UserService,
	],
})
export class CommonModule {}
