import { Component } from '@angular/core';

import { UserService } from '../user.service';

@Component({
	selector: 'logout-component',
	templateUrl: 'logout.html',
  	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
	user: any;

	constructor(public userService: UserService) {}
	
	logout() {
		this.userService.logout();
	}
}
