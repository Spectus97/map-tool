import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ContentComponent} from './content/content.component';
import {MapAssetsComponent} from './map-assets/map-assets.component';
import {ToolPanelComponent} from './tool-panel/tool-panel.component';
import {HeaderComponent} from './header/header.component';
import {AppService} from './service/app.service';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MapAssetsComponent,
    ToolPanelComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
