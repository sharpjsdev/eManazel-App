import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { RootPageRoutingModule } from './root-routing.module';

import { RootPage } from './root.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RootPageRoutingModule
  ],
  declarations: [RootPage]
})
export class RootPageModule {}
