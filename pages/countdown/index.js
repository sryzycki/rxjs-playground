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


// elem refs
const coundown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$.pipe(
  mapTo(-1),
  scan((accumulator, current) => {
    return accumulator + current;
  }, 10),
  filter(value => value >= 0),
).subscribe(value => {
  countdown.innerHTML = value;

  if (!value) {
    message.innerHTML = 'Liftoff!';
  }
});
