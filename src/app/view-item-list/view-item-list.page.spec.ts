import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewItemListPage } from './view-item-list.page';

describe('ViewItemListPage', () => {
  let component: ViewItemListPage;
  let fixture: ComponentFixture<ViewItemListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewItemListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
