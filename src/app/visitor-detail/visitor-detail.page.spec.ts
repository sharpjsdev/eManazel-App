import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorDetailPage } from './visitor-detail.page';

describe('VisitorDetailPage', () => {
  let component: VisitorDetailPage;
  let fixture: ComponentFixture<VisitorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
