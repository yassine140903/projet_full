import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component'; // Import your standalone component

@NgModule({
  imports: [
    // No need for AppModule or ServerModule now
  ],
  bootstrap: [AppComponent], // Bootstrap your standalone root component
})
export class AppServerModule {}
