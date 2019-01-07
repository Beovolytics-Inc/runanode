import { EMPTY, from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ApiPromise, ApiRx } from '@polkadot/api';

import types from '../types';

const testPageEpic = action$ =>
  action$.pipe(
    ofType(types.testPage.triggered),
    mergeMap(() => EMPTY)
  );

export default [testPageEpic];