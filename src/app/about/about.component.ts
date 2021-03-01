import { Component, OnInit } from '@angular/core';
import {createHttpObservable} from '../common/util';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const sub = createHttpObservable('/api/courses').subscribe();
    setTimeout(() => sub.unsubscribe(), 0);
  }
}
