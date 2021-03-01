import {Component, OnInit} from '@angular/core';
import {AsyncSubject, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {
    const asyncSubject = new AsyncSubject();
    const replaySubject = new ReplaySubject();
    const asyncSeries$ = asyncSubject.asObservable();
    const replaySeries$ = replaySubject.asObservable();
    asyncSeries$.subscribe(val => console.log('early AsyncSubject sub: ', val));
    replaySeries$.subscribe(val => console.log('early ReplaySubject sub: ', val));

    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);

    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);

    asyncSeries$.subscribe(val => console.log('after AsyncSubject next sub: ', val));
    replaySeries$.subscribe(val => console.log('after ReplaySubject next sub: ', val));

    asyncSubject.next(4);
    replaySubject.next(4);

    asyncSubject.complete();
    replaySubject.complete();

    setTimeout(() => {
        asyncSeries$.subscribe(val => console.log('late AsyncSubject sub: ', val));
        replaySeries$.subscribe(val => console.log('late ReplaySubject sub: ', val));
      }
      ,
      3000
    );
  }
}






