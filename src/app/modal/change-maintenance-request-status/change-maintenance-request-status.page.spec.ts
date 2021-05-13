import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeMaintenanceRequestStatusPage } from './change-maintenance-request-status.page';

describe('ChangeMaintenanceRequestStatusPage', () => {
  let component: ChangeMaintenanceRequestStatusPage;
  let fixture: ComponentFixture<ChangeMaintenanceRequestStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMaintenanceRequestStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeMaintenanceRequestStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
