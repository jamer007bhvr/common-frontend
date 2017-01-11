import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { User } from './user.model';

@Injectable()
export class UserService {
	private _user: User;
	private _token: String;

	constructor(public api: Api, public storage: Storage, public zone: NgZone) {

		storage.get('user').then(user => {
			this.zone.run(() => { this._user = user; });
		});
		storage.get('jsonwebtoken').then(token => {
			this._token = token;
		});
	}

	/**
	 * Send a POST request to our login endpoint with the data
	 * the user entered on the form.
	 */
	login(credentials: any) {
		const seq = this.api.post('/login', credentials).share();
		
		seq
			.map(res => res.json())
			.subscribe(res => {
				this.loggedIn(res);

			}, err => {
				logger.warn(err);
			});

		return seq;
	}

	signup(accountInfo: any) {
		/*
		let seq = this.api.post('signup', accountInfo).share();

		seq
			.map(res => res.json())
			.subscribe(res => {
				// If the API returned a successful response, mark the user as logged in
				if (res.status === 'success') {
					this._loggedIn(res);
				}
			}, err => {
				console.error('ERROR', err);
			});

		return seq;
		*/
	}

	get user(): any {
		return this._user;
	}
	set user(user) {
		this.zone.run(() => { this._user = user; });
		this.storage.set('user', user);
	}
	get token(): String {
		return this._token;
	}
	set token(token) {
		this._token = token;
		this.storage.set('jsonwebtoken', token);
	}

	logout() {
		this.user = null;
		this.token = null;
	}

	loggedIn(data) {
		this.user = data.user;
		this.token = data.token;
	}
}
