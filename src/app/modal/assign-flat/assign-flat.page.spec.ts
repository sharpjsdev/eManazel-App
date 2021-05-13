import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignFlatPage } from './assign-flat.page';

describe('AssignFlatPage', () => {
  let component: AssignFlatPage;
  let fixture: ComponentFixture<AssignFlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignFlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
