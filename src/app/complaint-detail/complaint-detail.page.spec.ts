import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplaintDetailPage } from './complaint-detail.page';

describe('ComplaintDetailPage', () => {
  let component: ComplaintDetailPage;
  let fixture: ComponentFixture<ComplaintDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
