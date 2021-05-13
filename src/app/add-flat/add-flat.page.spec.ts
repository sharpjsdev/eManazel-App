import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFlatPage } from './add-flat.page';

describe('AddFlatPage', () => {
  let component: AddFlatPage;
  let fixture: ComponentFixture<AddFlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
