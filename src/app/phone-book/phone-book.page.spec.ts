import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneBookPage } from './phone-book.page';

describe('PhoneBookPage', () => {
  let component: PhoneBookPage;
  let fixture: ComponentFixture<PhoneBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
