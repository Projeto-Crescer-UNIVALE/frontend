import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinasListComponent } from './oficinas-list.component';

describe('OficinasListComponent', () => {
  let component: OficinasListComponent;
  let fixture: ComponentFixture<OficinasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficinasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OficinasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
