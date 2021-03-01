import {Component} from '@angular/core';
import {StoreService} from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private storeService: StoreService) {
    this.storeService.init();
  }
}
