import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExternalRequestDetailPage } from './external-request-detail.page';

describe('ExternalRequestDetailPage', () => {
  let component: ExternalRequestDetailPage;
  let fixture: ComponentFixture<ExternalRequestDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalRequestDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalRequestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
