import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$: Observable<Course[]> = http$
      .pipe(
        map(res => Object.values(res['payload']) as Course[]),
        shareReplay()
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === 'ADVANCED'))
      );
  }
}
