import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResidentAddPage } from './resident-add.page';

describe('ResidentAddPage', () => {
  let component: ResidentAddPage;
  let fixture: ComponentFixture<ResidentAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
