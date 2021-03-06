import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import theme, { media } from 'components/defaultTheme';

const defaultThemeStyle = p => {
  const { colors } = p.theme;

  return {
    background: colors.V900,
    boxShadow: `0 2px 4px 0 ${colors.N900}`,
    overlayBackground: 'rgba(54, 58, 61, 0.7)', // TODO: move to colcors
    color: colors.text,
  };
};

const computedThemeStyle = p => p.theme.utils.createThemeStyle(p, defaultThemeStyle);

const Modal = ({
  isOpen,
  onOpenModal,
  onCloseModal,
  styles,
  children,
  className,
  ...restProps
}) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onOpenModal}
      onRequestClose={onCloseModal}
      className={contentClassName}
      overlayClassName={overlayClassName}
      ariaHideApp={false}
      {...restProps}
    >
      {children}
    </ReactModal>
  );
};

const StyledModal = styled(Modal)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: ${p => computedThemeStyle(p).overlayBackground};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    position: absolute;
    border-radius: 3px;
    min-height: 10rem;
    max-height: 80vh;
    background: ${p => computedThemeStyle(p).background};
    box-shadow: ${p => computedThemeStyle(p).boxShadow};
    color: ${p => computedThemeStyle(p).color};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${media.smDown`
      width: 98%;
    `}

    ${media.smUp`
      width: 30rem;
    `}

    ${media.mdUp`
      width: 48rem;
    `}

    :focus {
      outline: 0;
    }
  }
`;

StyledModal.defaultProps = {
  theme,
  themeKey: 'Modal',
};

export default StyledModal;
