import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { SearchComponent } from './components/search/search';
import { WatchlistComponent } from './components/watchlist/watchlist';
import { AuthGuard } from './guards/auth-guard';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { WatchlistItemDetailsComponent } from './components/watchlist-item-details/watchlist-item-details';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'product/:productName', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'watchlist-item/:id', component: WatchlistItemDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }