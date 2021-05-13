import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  language: any;

  constructor(
    private translate: TranslateService
  ) { }
  getDefaultLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }

  setLanguage(setLang) {
    this.translate.use(setLang);
  }
  changeLanguage(lang) {
    this.translate.use(lang);
    this.language = lang;
  }
  onChangeLangugae(postData: any): Observable<any> {
    return postData;
  }

}
