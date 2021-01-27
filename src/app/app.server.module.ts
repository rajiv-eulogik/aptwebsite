import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

// import { ShareButtonModule } from '@ngx-share/button';
// import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    // ShareButtonsModule
    // ShareButtonModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
