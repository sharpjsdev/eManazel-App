import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable , BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  authState = new BehaviorSubject(false);
  constructor(
    private httpService: HttpService,
    private router: Router,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  ifLoggedIn() {    
    if (localStorage.getItem('user_email')!=null) { 
      this.authState.next(true);
    }
  }
  login(url,postData: any): Observable<any> {
    return this.httpService.post(url, postData);
  }

  common(url , postData: any): Observable<any> {
    return this.httpService.post(url, postData);
  }
    
  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
    }
    
  logout() {
    localStorage.clear();
    this.router.navigate(['/root']);
    this.authState.next(false);
  }
  isAuthenticated() {
      return this.authState.value;
  }
  // canActivate(): boolean {
  //   return  this.isAuthenticated();
      
  // }
  canActivate(): boolean {
    if(this.isAuthenticated()){
      console.log(this.isAuthenticated);
      if(localStorage.getItem('user_type')=='4'){
        this.router.navigate(['/community-dashboard']);
      }else{
        this.router.navigate(['/dashboard']);
      }
        
        return false;
    }
    return true;
}
  appUrl(){
    return this.httpService.app_url();
  }
  webUrl(){
    return this.httpService.home_url();
  }
}
