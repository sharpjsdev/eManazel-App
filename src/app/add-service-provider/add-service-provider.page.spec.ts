import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddServiceProviderPage } from './add-service-provider.page';

describe('AddServiceProviderPage', () => {
  let component: AddServiceProviderPage;
  let fixture: ComponentFixture<AddServiceProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceProviderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
