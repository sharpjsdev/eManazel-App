import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDocumentPageRoutingModule } from './add-document-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddDocumentPage } from './add-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddDocumentPageRoutingModule
  ],
  declarations: [AddDocumentPage,MenuHeaderPage]
})
export class AddDocumentPageModule {}
