import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CommunityDashboardPageRoutingModule } from './community-dashboard-routing.module';

import { CommunityDashboardPage } from './community-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityDashboardPageRoutingModule,
    Ng2GoogleChartsModule,
    TranslateModule
  ],
  declarations: [CommunityDashboardPage]
})
export class CommunityDashboardPageModule {}
