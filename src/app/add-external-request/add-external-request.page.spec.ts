import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExternalRequestPage } from './add-external-request.page';

describe('AddExternalRequestPage', () => {
  let component: AddExternalRequestPage;
  let fixture: ComponentFixture<AddExternalRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExternalRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExternalRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
