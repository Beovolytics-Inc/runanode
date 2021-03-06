import mergeOptions from 'merge-options';
import { remote } from 'electron';
import parseArgs from "minimist";

import commonConfig from './common';

const feature = {
  // justAnotherFeature: true,
};

const devConfig = {
  feature,
  // dev specific config comes here...
  gaTrackId: 'UA-132943388-1',
  webSocket: {
    latency: {
      period: remote && parseArgs(remote.process.argv).WEBSOCKET_LATENCY_PERIOD ? parseArgs(remote.process.argv).WEBSOCKET_LATENCY_PERIOD : 5 * 1000,
    },
  },
};

export default mergeOptions(commonConfig, devConfig);
