import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComplaintRejectPageRoutingModule } from './complaint-reject-routing.module';

import { ComplaintRejectPage } from './complaint-reject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComplaintRejectPageRoutingModule
  ],
  declarations: [ComplaintRejectPage]
})
export class ComplaintRejectPageModule {}
