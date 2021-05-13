import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDocumentPageRoutingModule } from './edit-document-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditDocumentPage } from './edit-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditDocumentPageRoutingModule
  ],
  declarations: [EditDocumentPage,MenuHeaderPage]
})
export class EditDocumentPageModule {}
