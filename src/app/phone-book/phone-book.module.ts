import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneBookPageRoutingModule } from './phone-book-routing.module';

import { PhoneBookPage } from './phone-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PhoneBookPageRoutingModule
  ],
  declarations: [PhoneBookPage,MenuHeaderPage]
})
export class PhoneBookPageModule {}
