import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuildingServicePage } from './building-service.page';

describe('BuildingServicePage', () => {
  let component: BuildingServicePage;
  let fixture: ComponentFixture<BuildingServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
