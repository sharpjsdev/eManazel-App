import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { AddUserPageRoutingModule } from './add-user-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddUserPage } from './add-user.page';
import { SharedPasswordMatchPageModule } from '../shared-password-match/shared-password-match.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddUserPageRoutingModule,
    SharedPasswordMatchPageModule
  ],
  declarations: [AddUserPage,MenuHeaderPage]
})
export class AddUserPageModule {}
