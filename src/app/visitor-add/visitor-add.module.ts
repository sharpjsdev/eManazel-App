import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VisitorAddPageRoutingModule } from './visitor-add-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { VisitorAddPage } from './visitor-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VisitorAddPageRoutingModule
  ],
  declarations: [VisitorAddPage,MenuHeaderPage]
})
export class VisitorAddPageModule {}
