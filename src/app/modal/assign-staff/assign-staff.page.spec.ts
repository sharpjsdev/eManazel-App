import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignStaffPage } from './assign-staff.page';

describe('AssignStaffPage', () => {
  let component: AssignStaffPage;
  let fixture: ComponentFixture<AssignStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
