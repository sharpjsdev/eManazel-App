import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeJobStatusPage } from './change-job-status.page';

describe('ChangeJobStatusPage', () => {
  let component: ChangeJobStatusPage;
  let fixture: ComponentFixture<ChangeJobStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeJobStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeJobStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
