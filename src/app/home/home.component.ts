import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map, shareReplay} from 'rxjs/operators';
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
        catchError(err => {
          console.log('Error occurred: ', err);
          return throwError(err);
        }),
        finalize(() => console.log('finalize')),
        map(res => Object.values(res['payload']) as Course[]),
        shareReplay(),
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
