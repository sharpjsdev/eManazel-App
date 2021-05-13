import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentDetailPageRoutingModule } from './document-detail-routing.module';

import { DocumentDetailPage } from './document-detail.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocumentDetailPageRoutingModule
  ],
  declarations: [DocumentDetailPage]
})
export class DocumentDetailPageModule {}
