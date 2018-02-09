import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
    private redirectUrl = 'http://localhost:4200/';
    auth0 = new auth0.WebAuth({
        clientID: '25gB3nmB44C6FG9lAPA8REuBcnnCen0A',
        domain: 'bernardomb.auth0.com',
        responseType: 'token id_token',
        audience: 'https://bernardomb.auth0.com/userinfo',
        redirectUri: this.redirectUrl,
        scope: 'openid'
    });
    
    constructor(public router: Router) { }
    
    public setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    public login(): void {
        console.log(this.auth0);
        this.auth0.authorize();
    }

    /**
     * Looks for the result of authentication in the URL hash.
     * Then, the result is processed with the parseHash method from auth0.js.
     * @memberof AuthService
     */
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }

    /**
     * Stores the user's Access Token, ID Token, and the Access Token's expiry time in browser storage.
     * @private
     * @param {any} authResult
     * @memberof AuthService
     */
    private setSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    /**
     * Removes the user's tokens and expiry time from browser storage.
     * @memberof AuthService
     */
    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    /**
     * Checks whether the expiry time for the user's Access Token has passed.
     * @returns {boolean}
     * @memberof AuthService
     */
    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
