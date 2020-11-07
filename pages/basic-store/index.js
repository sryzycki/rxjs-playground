import {ObservableStore} from "./store";

const store = new ObservableStore({
  user: 'Brian',
  isAuthenticated: false,
});

// store.stateChanges().subscribe(console.log);

store.selectState('user').subscribe(console.log);

store.updateState({
  user: 'Joe',
});

store.updateState({
  isAuthenticated: true,
});
