import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PokemonComponent } from './page/pokemon/pokemon.component';
import { CoctelesComponent } from './page/cocteles/cocteles.component';
import { ErrorComponent } from './page/error/error.component';
import { DbzComponent } from './page/dbz/dbz.component';
import { AuthGuard } from './guard/auth.guard';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'pokemon', component: PokemonComponent },
    { path: 'DBZ', component: DbzComponent },
    { path: 'cocteles', component: CoctelesComponent },
    { path: 'miapi', loadChildren: () => import('./page/miapi/miapi-routing.module').then(m => m.MiapiRoutingModule), canActivate:[AuthGuard]},

    { path: '**', component: ErrorComponent }

];
