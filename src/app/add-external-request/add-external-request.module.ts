import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddExternalRequestPageRoutingModule } from './add-external-request-routing.module';

import { AddExternalRequestPage } from './add-external-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddExternalRequestPageRoutingModule
  ],
  declarations: [AddExternalRequestPage,MenuHeaderPage]
})
export class AddExternalRequestPageModule {}
