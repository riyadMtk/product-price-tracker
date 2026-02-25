import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { SearchComponent } from './components/search/search';
import { WatchlistComponent } from './components/watchlist/watchlist';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { WatchlistItemDetailsComponent } from './components/watchlist-item-details/watchlist-item-details';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    WatchlistComponent,
    ProductDetailsComponent,
    WatchlistItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }