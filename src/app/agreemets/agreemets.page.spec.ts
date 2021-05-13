import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgreemetsPage } from './agreemets.page';

describe('AgreemetsPage', () => {
  let component: AgreemetsPage;
  let fixture: ComponentFixture<AgreemetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreemetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgreemetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
