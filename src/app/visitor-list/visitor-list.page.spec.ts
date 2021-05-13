import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorListPage } from './visitor-list.page';

describe('VisitorListPage', () => {
  let component: VisitorListPage;
  let fixture: ComponentFixture<VisitorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
