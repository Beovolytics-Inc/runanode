// @flow
/**
 * The ipc api contract between main and renderer process.
 * Defines channel names and their possible message types.
 * Complex types are referenced from the common/types folder to keep this api readable.
 */
// import type {
//   ReportRequestHttpOptions,
//   ReportRequestPayload
// } from '../types/report-request.types';
import type { GeneratePaperWalletParams } from '../types/paper-wallet-request.types';

/**
 * Channel for loading an base64 encoded asset from within the `source/renderer` folder
 */
export const LoadAssetChannelName = 'LoadAssetChannel';
export type LoadAssetRendererRequest = { fileName: string };
export type LoadAssetMainResponse = string;
/**
 * Channel for opening a url in the default browser
 */
export const OpenExternalUrlChannelName = 'OpenExternalUrlChannel';
export type OpenExternalUrlRendererRequest = string;
export type OpenExternalUrlMainResponse = void;

/**
 * Channel to send bug report requests
 */
export const ReportRequestChannelName = 'ReportRequestChannel';
// export type ReportRequestRendererRequest = {
//   httpOptions: ReportRequestHttpOptions,
//   requestPayload?: ReportRequestPayload
// }
export type ReportRequestMainResponse = void;

/**
 * Channel to generate and save a paper wallet certificate
 */
export const GeneratePaperWalletChannelName = 'GeneratePaperWalletChannel';
export type GeneratePaperWalletRendererRequest = GeneratePaperWalletParams;
export type GeneratePaperWalletMainResponse = void;

// TODO: refactor to improved structure above
export const THENODE_AWAIT_UPDATE_CHANNEL = 'THENODE_AWAIT_UPDATE_CHANNEL';
export const THENODE_STATE_CHANGE_CHANNEL = 'THENODE_STATE_CHANGE_CHANNEL';
export const THENODE_TLS_CONFIG_CHANNEL = 'THENODE_TLS_CONFIG_CHANNEL';
export const THENODE_RESTART_CHANNEL = 'THENODE_RESTART_CHANNEL';
export const THENODE_FAULT_INJECTION_CHANNEL = 'THENODE_FAULT_INJECTION_CHANNEL';
export const THENODE_STATUS_CHANNEL = 'THENODE_STATUS_CHANNEL';

export const GO_TO_ADA_REDEMPTION_SCREEN_CHANNEL = 'GO_TO_ADA_REDEMPTION_SCREEN_CHANNEL';
export const GO_TO_NETWORK_STATUS_SCREEN_CHANNEL = 'GO_TO_NETWORK_STATUS_SCREEN_CHANNEL';

export const OPEN_ABOUT_DIALOG_CHANNEL = 'OPEN_ABOUT_DIALOG_CHANNEL';
