import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuildingAddPage } from './building-add.page';

describe('BuildingAddPage', () => {
  let component: BuildingAddPage;
  let fixture: ComponentFixture<BuildingAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
