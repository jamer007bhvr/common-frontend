import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
	selector: 'logout-component',
	templateUrl: 'logout.html',
})
export class LogoutComponent {
	constructor(public userService: UserService) {

	}

	logout() {
		this.userService.logout();
	}
}
