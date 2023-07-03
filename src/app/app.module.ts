import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';


import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";


import {appReducers} from "./app.reducer";
import {environment} from 'src/environments/environment';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FooterComponent} from "./components/footer/footer.component";
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {RegisterComponent} from './components/register/register.component';
import {TiendaItemComponent} from "./components/tienda-item/tienda-item.component";
import {ListTiendasComponent} from "./components/list-tiendas/list-tiendas.component";

import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {UserService} from "./services/user/user.service";
import {AuthGuard} from "./guards/user.guard";
import {MapComponent} from "./components/map/map.component";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ListTiendasComponent,
    TiendaItemComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {}
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
