import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViolationListPage } from './violation-list.page';

describe('ViolationListPage', () => {
  let component: ViolationListPage;
  let fixture: ComponentFixture<ViolationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViolationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
