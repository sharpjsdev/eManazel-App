import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SosListPage } from './sos-list.page';

describe('SosListPage', () => {
  let component: SosListPage;
  let fixture: ComponentFixture<SosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
