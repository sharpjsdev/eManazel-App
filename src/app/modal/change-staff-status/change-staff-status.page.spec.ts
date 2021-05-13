import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeStaffStatusPage } from './change-staff-status.page';

describe('ChangeStaffStatusPage', () => {
  let component: ChangeStaffStatusPage;
  let fixture: ComponentFixture<ChangeStaffStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStaffStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStaffStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
