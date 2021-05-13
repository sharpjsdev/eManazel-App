import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitListPage } from './unit-list.page';

describe('UnitListPage', () => {
  let component: UnitListPage;
  let fixture: ComponentFixture<UnitListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
