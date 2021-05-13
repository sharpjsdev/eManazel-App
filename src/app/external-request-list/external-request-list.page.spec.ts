import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExternalRequestListPage } from './external-request-list.page';

describe('ExternalRequestListPage', () => {
  let component: ExternalRequestListPage;
  let fixture: ComponentFixture<ExternalRequestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalRequestListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalRequestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
