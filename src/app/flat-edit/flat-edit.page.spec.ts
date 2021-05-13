import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatEditPage } from './flat-edit.page';

describe('FlatEditPage', () => {
  let component: FlatEditPage;
  let fixture: ComponentFixture<FlatEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
