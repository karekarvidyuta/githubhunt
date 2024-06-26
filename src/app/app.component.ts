import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {GithubService} from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GithubService]
})
export class AppComponent {
  status = 'ONLINE';
  isConnected = true;

  constructor(private swUpdate: SwUpdate, private swPush: SwPush,
              private snackbar: MatSnackBar,
              // private connectionService: ConnectionService
              ) {


    // this.connectionService.monitor().subscribe(isConnected => {
    //   this.isConnected = isConnected;
    //   if (this.isConnected) {
    //     this.status = "ONLINE";
    //   } else {
    //     this.status = "OFFLINE";
    //   }
    // })
    this.swUpdate.available.subscribe(evt => {
this.swUpdate.checkForUpdate().then(() => {

        const snack = this.snackbar.open('Update Available', 'Reload',{
          duration: 7000,
          panelClass: ['blue-snackbar']
        });
        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });

        setTimeout(() => {
          snack.dismiss();
        }, 5000);
      });
    });


  }
}
