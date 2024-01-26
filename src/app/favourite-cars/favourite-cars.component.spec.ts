import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCarsComponent } from './favourite-cars.component';

describe('FavouriteCarsComponent', () => {
  let component: FavouriteCarsComponent;
  let fixture: ComponentFixture<FavouriteCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteCarsComponent]
    });
    fixture = TestBed.createComponent(FavouriteCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
