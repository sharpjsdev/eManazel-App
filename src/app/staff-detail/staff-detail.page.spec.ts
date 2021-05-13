import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffDetailPage } from './staff-detail.page';

describe('StaffDetailPage', () => {
  let component: StaffDetailPage;
  let fixture: ComponentFixture<StaffDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
