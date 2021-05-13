import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestAddMorePage } from './test-add-more.page';

describe('TestAddMorePage', () => {
  let component: TestAddMorePage;
  let fixture: ComponentFixture<TestAddMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAddMorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAddMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
