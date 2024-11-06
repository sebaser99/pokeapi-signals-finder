import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-pokemon-platform',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule, HttpClientModule],
  providers:[PokemonService],
  templateUrl: './pokemon-platform.component.html',
  styleUrl: './pokemon-platform.component.css'
})
export class PokemonPlatformComponent {
  pokemon = signal<Pokemon | null>(null);
  loading = signal<boolean>(false);
  sprite = signal<string>('');
  error = signal<string>('');
  spriteInterval: number | undefined;

  constructor(private pokemonService: PokemonService) { }

  search(term: string) {
    if (!term.trim()) return;

    this.loading.set(true);
    this.error.set('');
    this.stopSpriteAnimation();

    this.pokemonService.getPokemon(term).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.startSpriteAnimation();
        this.playPokemonSound();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Pokémon no existe, vuelve a buscar');
        this.pokemon.set(null);
        this.loading.set(false);
      }
    });
  }

  startSpriteAnimation() {
    if (!this.pokemon()) return;

    let isFront = true;
    this.sprite.set(this.pokemon()!.sprites.front_default);

    this.spriteInterval = window.setInterval(() => {
      const pokemon = this.pokemon();
      if (!pokemon) return;

      this.sprite.set(
        isFront ?
          pokemon.sprites.front_default :
          pokemon.sprites.back_default
      );
      isFront = !isFront;
    }, 1000);
  }

  stopSpriteAnimation() {
    if (this.spriteInterval) {
      window.clearInterval(this.spriteInterval);
    }
  }

  playPokemonSound() {
    const id = this.pokemon()?.id;
    if (!id) return;

    const soundUrl = `https://pokemoncries.com/cries/${id}.mp3`;
    const audio = new Audio(soundUrl);
    audio.play().catch(e => console.log('Error reproduciendo sonido:', e));
  }

  ngOnDestroy() {
    this.stopSpriteAnimation();
  }
}
