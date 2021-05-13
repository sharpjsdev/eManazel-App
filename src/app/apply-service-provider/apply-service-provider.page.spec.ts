import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyServiceProviderPage } from './apply-service-provider.page';

describe('ApplyServiceProviderPage', () => {
  let component: ApplyServiceProviderPage;
  let fixture: ComponentFixture<ApplyServiceProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyServiceProviderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyServiceProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
