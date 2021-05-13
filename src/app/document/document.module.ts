import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { DocumentPageRoutingModule } from './document-routing.module';

import { DocumentPage } from './document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocumentPageRoutingModule
  ],
  declarations: [DocumentPage,MenuHeaderPage]
})
export class DocumentPageModule {}
