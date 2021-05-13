import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeRequestStatusPage } from './change-request-status.page';

describe('ChangeRequestStatusPage', () => {
  let component: ChangeRequestStatusPage;
  let fixture: ComponentFixture<ChangeRequestStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRequestStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRequestStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
