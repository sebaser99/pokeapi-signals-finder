import { Routes } from '@angular/router';
import { PokemonPlatformComponent } from './components/pokemon-platform/pokemon-platform.component';

export const routes: Routes = [
  {
    path: "",
    component: PokemonPlatformComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];
