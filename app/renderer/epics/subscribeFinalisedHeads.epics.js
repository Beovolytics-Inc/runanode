import { Observable } from 'rxjs/Observable';
import { debounceTime, map, mergeMap } from 'rxjs/operators';

import appConfig from 'app/config';
import types from 'renderer/types';
import { storageKeys } from 'renderer/api/utils/storage';
import { Logger } from 'renderer/utils/logging';
import chainEpics from './chainEpics';

const subscribeFinalizedHeadsEpic = action$ =>
  action$.ofType(types.subscribeFinalizedHeads.triggered).pipe(
    debounceTime(appConfig.app.apiInitDebounceTime), // wait for api init
    mergeMap(() => {
      return new Observable(observer => {
        window.appApi.api.rpc.chain.subscribeFinalizedHeads(newHead => {
          // Logger.trace(`subscribeFinalizedHeadsEpic, got FinalizedHead.`);

          observer.next(newHead);
        });
      }).pipe(
        debounceTime(appConfig.app.defaultDebounceTime),
        map(newHead => {
          return { type: types.finalizedHeader.changed, payload: newHead };
        })
      );
    })
  );

const getAllAccountsBalancesEpic = (action$, state$) =>
  action$.ofType(types.getAllAccountsBalances.requested).pipe(
    mergeMap(async () => {
      const wallets = state$.value.localStorage[storageKeys.WALLETS] || [];

      const allWalletBalances = await Promise.all(
        wallets.map(async wallet => {
          const walletBalances = await window.appApi.getBalancesByWallet(wallet);
          return walletBalances;
        })
      );

      const allAccountBalances = allWalletBalances.reduce(
        (acc, curr) => Object.assign(curr, acc),
        {}
      );

      return {
        type: types.getAllAccountsBalances.completed,
        payload: allAccountBalances,
      };
    })
  );

const chainNewHeadWithBalancesEpics = chainEpics(
  types.newHead.changed,
  types.getAllAccountsBalances.requested
);

export default [
  subscribeFinalizedHeadsEpic,
  getAllAccountsBalancesEpic,
  chainNewHeadWithBalancesEpics,
];
