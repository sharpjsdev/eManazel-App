import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParkingListPage } from './parking-list.page';

describe('ParkingListPage', () => {
  let component: ParkingListPage;
  let fixture: ComponentFixture<ParkingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
