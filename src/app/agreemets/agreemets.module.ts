import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AgreemetsPageRoutingModule } from './agreemets-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AgreemetsPage } from './agreemets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AgreemetsPageRoutingModule
  ],
  declarations: [AgreemetsPage , MenuHeaderPage]
})
export class AgreemetsPageModule {}
