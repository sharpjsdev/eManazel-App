import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunityDashboardPage } from './community-dashboard.page';

describe('CommunityDashboardPage', () => {
  let component: CommunityDashboardPage;
  let fixture: ComponentFixture<CommunityDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
