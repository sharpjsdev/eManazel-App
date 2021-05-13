import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecuritySosPage } from './security-sos.page';

describe('SecuritySosPage', () => {
  let component: SecuritySosPage;
  let fixture: ComponentFixture<SecuritySosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritySosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecuritySosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
