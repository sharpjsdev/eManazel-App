import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorAddPage } from './visitor-add.page';

describe('VisitorAddPage', () => {
  let component: VisitorAddPage;
  let fixture: ComponentFixture<VisitorAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
