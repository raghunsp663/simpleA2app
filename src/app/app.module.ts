import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import {appRoutes} from './app.routes';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import {InsuranceServiceService} from './insurance-service.service';
import { myInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    InsuranceServiceService,
    {
      provide: myInterceptor,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new myInterceptor(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
