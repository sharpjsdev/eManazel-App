import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatListPage } from './flat-list.page';

describe('FlatListPage', () => {
  let component: FlatListPage;
  let fixture: ComponentFixture<FlatListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
