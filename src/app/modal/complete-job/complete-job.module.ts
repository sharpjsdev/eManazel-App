import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CompleteJobPageRoutingModule } from './complete-job-routing.module';

import { CompleteJobPage } from './complete-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CompleteJobPageRoutingModule
  ],
  declarations: [CompleteJobPage]
})
export class CompleteJobPageModule {}
