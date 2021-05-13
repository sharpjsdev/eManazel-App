import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoiceCreatePage } from './invoice-create.page';

describe('InvoiceCreatePage', () => {
  let component: InvoiceCreatePage;
  let fixture: ComponentFixture<InvoiceCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
