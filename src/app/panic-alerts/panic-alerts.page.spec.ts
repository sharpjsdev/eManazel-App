import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanicAlertsPage } from './panic-alerts.page';

describe('PanicAlertsPage', () => {
  let component: PanicAlertsPage;
  let fixture: ComponentFixture<PanicAlertsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanicAlertsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanicAlertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
