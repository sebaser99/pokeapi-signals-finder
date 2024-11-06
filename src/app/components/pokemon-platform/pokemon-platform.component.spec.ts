import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPlatformComponent } from './pokemon-platform.component';

describe('PokemonPlatformComponent', () => {
  let component: PokemonPlatformComponent;
  let fixture: ComponentFixture<PokemonPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
