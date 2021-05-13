import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPasswordMatchPageRoutingModule } from './shared-password-match-routing.module';
import { MustMatchDirective } from './../_helpers/must-match.directive';
import { SharedPasswordMatchPage } from './shared-password-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPasswordMatchPageRoutingModule
  ],
  declarations: [SharedPasswordMatchPage , MustMatchDirective],
  exports:[MustMatchDirective]
})
export class SharedPasswordMatchPageModule {}
