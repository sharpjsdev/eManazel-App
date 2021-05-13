import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestAddMorePageRoutingModule } from './test-add-more-routing.module';

import { TestAddMorePage } from './test-add-more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestAddMorePageRoutingModule
  ],
  declarations: [TestAddMorePage]
})
export class TestAddMorePageModule {}
