import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedPasswordMatchPage } from './shared-password-match.page';

describe('SharedPasswordMatchPage', () => {
  let component: SharedPasswordMatchPage;
  let fixture: ComponentFixture<SharedPasswordMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPasswordMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPasswordMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
