import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = environment.apiUrl;

    login(username: string, password: string){
        return this.http.post<{token: string}>(
            `${this.apiUrl}/auth/login`,
            {username, password}
        ).pipe(
            tap(res => localStorage.setItem('token', res.token))
        );
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        return !!localStorage.getItem('token');
    }
}