import {Observable, combineLatest, of, fromEvent, timer, interval} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {
  delay,
  exhaustMap,
  map,
  mapTo,
  mergeMap,
  filter,
  tap,
  finalize,
  scan,
  takeUntil,
  mergeMapTo,
  pluck,
  share,
  switchMapTo
} from 'rxjs/operators';
