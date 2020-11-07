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


function calculateScrollPercent(element) {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = element;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar = document.querySelector('.progress-bar');


const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  map(({target}) => calculateScrollPercent(target.body))
);

progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});
