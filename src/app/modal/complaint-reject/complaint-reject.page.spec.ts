import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplaintRejectPage } from './complaint-reject.page';

describe('ComplaintRejectPage', () => {
  let component: ComplaintRejectPage;
  let fixture: ComponentFixture<ComplaintRejectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintRejectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintRejectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
