import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {fromEvent, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {debug, RxjsLoggingLevel, setRxJsLoggingLevel} from '../common/debug';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  courseId: string;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable<Course>(`/api/courses/${this.courseId}`);
    setRxJsLoggingLevel(RxjsLoggingLevel.Trace);
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(e => e.target.value),
        startWith(''),
        debug(RxjsLoggingLevel.Trace, 'search'),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search)),
        debug(RxjsLoggingLevel.Debug, 'lessons value')
      );
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res['payload'])
      );
  }
}
