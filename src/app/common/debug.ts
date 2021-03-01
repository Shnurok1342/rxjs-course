import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export enum RxjsLoggingLevel {
  Trace,
  Debug,
  Info,
  Error
}

let rxjsLoggingLevel = RxjsLoggingLevel.Info;

export function setRxJsLoggingLevel(level: RxjsLoggingLevel) {
  rxjsLoggingLevel = level;
}

export const debug = (level: RxjsLoggingLevel, message: string) =>
  (source: Observable<any>) => source
    .pipe(
      tap(val => {
        if (level >= rxjsLoggingLevel) {
          console.log(message + ': ', val);
        }
      })
    );
