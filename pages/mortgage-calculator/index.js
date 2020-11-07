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

import {calculateMortgage} from "./calculate-mortgage";


// elems
const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.getElementById('loanLength');
const expected = document.getElementById('expected');

// helpers
const createInputValueStream = elem => {
  return fromEvent(elem, 'input').pipe(
    map(event => parseFloat(event.target.value)),
  );
}

const saveResponse = mortgageAmount => {
  return of(mortgageAmount).pipe(
    delay(1000),
  );
}

// streams
const interest$ = createInputValueStream(interest);
const loanAmount$ = createInputValueStream(loanAmount);
const loanLength$ = createInputValueStream(loanLength);


const calculation$ = combineLatest(
  interest$,
  loanAmount$,
  loanLength$,
).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(
      interest, loanAmount, loanLength
    );
  }),
  tap(console.log),
  filter(mortgageAmount => !isNaN(mortgageAmount)),
  share(),
);

calculation$.subscribe(mortgageAmount => {
  expected.innerHTML = mortgageAmount;
});

calculation$.pipe(
  mergeMap(mortgageAmount => saveResponse(
    mortgageAmount
  )),
).subscribe();
