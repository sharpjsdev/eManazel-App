import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MyDetailsPageRoutingModule } from './my-details-routing.module';

import { MyDetailsPage } from './my-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyDetailsPageRoutingModule
  ],
  declarations: [MyDetailsPage]
})
export class MyDetailsPageModule {}
