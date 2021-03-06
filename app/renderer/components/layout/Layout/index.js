import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import R from 'ramda';
import Notification from 'components/Notification';
import TopBar from '../TopBar';
import SideNav from '../SideNav';
import withContainer from './container';
import getNotificationByType from './notificationBarTemplates';

const calcContentViewHeight = p => {
  if (p.hasTopBar) {
    if (p.isInStaking) {
      return 'calc(100% - 80px - 48px)';
    }

    return 'calc(100% - 80px)';
  }

  return '100%';
};

const PageWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: ${p => calcContentViewHeight(p)};
  min-height: 40rem;
`;

const Content = styled.div`
  background: ${theme.pageBackground};
  flex: 1 auto;
`;

const Layout = ({
  isInStaking,
  topBar,
  defaultTopBar,
  sidebar,
  defaultSidebar,
  notificationType,
  children,
}) => {
  return (
    <PageWrapper>
      {defaultTopBar ? <TopBar /> : topBar}
      {notificationType && <Notification>{getNotificationByType(notificationType)}</Notification>}
      <ContentWrapper hasTopBar={!!topBar || !!defaultTopBar} {...{ isInStaking }}>
        {defaultSidebar ? <SideNav /> : sidebar}
        <Content>{children}</Content>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default withContainer(Layout);
