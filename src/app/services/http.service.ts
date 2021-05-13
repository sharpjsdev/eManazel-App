import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.api_url + serviceName;
    
    return this.http.post(url, data, options);
    }

    app_url(){
      return environment.image_url;
    }
    home_url(){
      return environment.api_url;
    }
}
