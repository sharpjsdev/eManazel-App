import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResidentListPage } from './resident-list.page';

describe('ResidentListPage', () => {
  let component: ResidentListPage;
  let fixture: ComponentFixture<ResidentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
