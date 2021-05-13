import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ReIssueVisitorPageRoutingModule } from './re-issue-visitor-routing.module';

import { ReIssueVisitorPage } from './re-issue-visitor.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReIssueVisitorPageRoutingModule
  ],
  declarations: [ReIssueVisitorPage]
})
export class ReIssueVisitorPageModule {}
