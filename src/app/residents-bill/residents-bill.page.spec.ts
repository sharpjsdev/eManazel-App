import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResidentsBillPage } from './residents-bill.page';

describe('ResidentsBillPage', () => {
  let component: ResidentsBillPage;
  let fixture: ComponentFixture<ResidentsBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentsBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentsBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
