import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {
    const subject = new Subject();
    const series$ = subject.asObservable();
    series$.subscribe(val => console.log('early sub: ', +val));

    subject.next(1);
    subject.next(2);
    subject.next(3);

    series$.subscribe(val => console.log('after next sub: ', +val));

    subject.next(4);

    setTimeout(() =>
        series$.subscribe(val => console.log('late sub: ', +val)),
      3000
    );
  }
}






