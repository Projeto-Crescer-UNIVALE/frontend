import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOficinaComponent } from './cadastro-oficina.component';

describe('CadastroOficinaComponent', () => {
  let component: CadastroOficinaComponent;
  let fixture: ComponentFixture<CadastroOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroOficinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
