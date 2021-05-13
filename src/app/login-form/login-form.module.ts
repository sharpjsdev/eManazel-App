import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LoginFormPageRoutingModule } from './login-form-routing.module';

import { LoginFormPage } from './login-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFormPageRoutingModule,
    TranslateModule
  ],
  declarations: [LoginFormPage]
})
export class LoginFormPageModule {}
