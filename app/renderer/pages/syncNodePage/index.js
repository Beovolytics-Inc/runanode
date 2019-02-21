import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Line } from 'rc-progress';
import { colors } from 'renderer/theme';

import { NetworkNameMapping } from 'common/types/cennznet-node.types';
import { Layout, LayoutWrapper, MainContent, SimpleSidebar } from 'components/layout';
import { PageHeading } from 'components';
import ROUTES from 'renderer/constants/routes';
import { Logger } from 'renderer/utils/logging';
import { storageKeys } from 'renderer/api/utils/storage';
import Spinner from 'components/Spinner';
import withContainer from './container';
import { environment } from '../../../main/environment';
import SideNav from '../../components/layout/SideNav';

const  { isDev } = environment;

const SpinnerWrapper = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SyncNodeTitle = styled.div`
  color: ${colors.N0};
  font-weight: 600;
  font-size: 1.7rem;
  margin: 3rem auto;
`;

const SyncNodeProgressWarpper = styled.div`
  display: flex;
`;

const SyncNodeProgress = styled.div`
  width: 60%;
  border-radius: 3px;
  border: 3px solid ${colors.primary};
`;

const SyncNodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin-left: 1rem;
`;

const TextWrapper = styled.div`
  color: ${colors.N0};
`;

const networkOptionMapping = {
  globalTestNet: 'Global test net',
  localTestNet: 'Local test net',
  mainNet: 'Main net',
};

const SyncNodePage = ({ nodeSystem, syncStream, syncRemoteStream, localStorage }) => {
  const selectedNetwork = localStorage[storageKeys.SELECTED_NETWORK];
  const { localNode } = nodeSystem;
  const { chain } = localNode;
  const isNetworkSwitched = selectedNetwork && selectedNetwork.value === NetworkNameMapping[chain];
  if (!isNetworkSwitched) {
    return (
      <Layout defaultSidebar={isDev ? <SideNav /> : <SimpleSidebar />}>
        <LayoutWrapper>
          <MainContent>
            <SpinnerWrapper>
              <Spinner size="2.5rem" />
            </SpinnerWrapper>
          </MainContent>
        </LayoutWrapper>
      </Layout>
    );
  }

  const { blockNum: bestBlock } = syncRemoteStream;
  const { blockNum: syncedBlock } = syncStream;
  const syncNodeProgress = bestBlock && bestBlock > 0 ? syncedBlock / bestBlock : 0;
  const syncNodePercentage =
    syncNodeProgress >= 0.995 && syncNodeProgress < 1
      ? 99
      : syncNodeProgress >= 1
      ? 100
      : (syncNodeProgress * 100).toFixed(2);

  Logger.info(`
  ===========================================
  Best block in MainNet #${bestBlock}
  ===========================================`);
  Logger.info(`
  ===========================================
  Best block in Local #${syncedBlock}
  ===========================================`);
  Logger.info(`  Sync progress in Local ${syncNodePercentage}%`);

  return (
    <Layout defaultSidebar={isDevOrDebugProd ? <SideNav /> : <SimpleSidebar />}>
      <LayoutWrapper>
        <MainContent>
          <SyncNodeTitle>{selectedNetwork ? selectedNetwork.label : 'Main net'}</SyncNodeTitle>
          <SyncNodeProgressWarpper>
            <SyncNodeProgress>
              <Line
                percent={syncNodePercentage}
                trailColor="transparent"
                trailWidth="7"
                strokeWidth="7"
                strokeColor={colors.primary}
                strokeLinecap="square"
                style={{ height: '100%', width: '100%' }}
              />
            </SyncNodeProgress>
            <SyncNodeInfo>
              <TextWrapper>{syncNodePercentage}% synced</TextWrapper>
              <TextWrapper>{`${syncedBlock} / ${bestBlock} blocks`}</TextWrapper>
            </SyncNodeInfo>
          </SyncNodeProgressWarpper>
        </MainContent>
      </LayoutWrapper>
    </Layout>
  );
};

export default withContainer(SyncNodePage);
