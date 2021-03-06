import React from 'react';
import styled from 'styled-components';
import mergeOptions from 'merge-options';
import theme from 'components/defaultTheme';
import { ToastContainer, Slide } from 'react-toastify';
import { IconCross } from 'components/icons';

const IconButton = styled.button`
  width: 2rem;
  height: 2rem;
  outline: none;
  border: 0;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 0;
  }
`;

const CloseButton = ({ closeToast }) => (
  <IconButton onClick={closeToast}>
    <IconCross />
  </IconButton>
);

const CustomToast = ({ children, ...props }) => {
  return (
    <ToastContainer transition={Slide} autoClose={5000} closeButton={<CloseButton />} {...props}>
      {children}
    </ToastContainer>
  );
};

const defaultThemeStyle = p => {
  const { colors } = p.theme;

  return {
    background: colors.background,
    boxShadow:
      '0 2px 1px -1px rgba(0, 0, 0, 0.18), 0 1px 1px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    color: colors.text,

    variants: {
      info: colors.info,
      error: colors.danger,
      success: colors.success,
      warning: colors.warning,
    },
  };
};

const computedThemeStyle = p => p.theme.utils.createThemeStyle(p, defaultThemeStyle);

const Toaster = styled(CustomToast)`
  margin-top: 4.5rem;

  .Toastify__toast {
    font-weight: 500;
    padding: 0;
    box-shadow: ${p => computedThemeStyle(p).boxShadow};
    background: ${p => computedThemeStyle(p).background};
    border-radius: 3px;
    color: ${p => computedThemeStyle(p).color};

    .Toastify__toast-body {
      min-height: 3rem;
      padding: 1rem 0;
    }

    .Toastify__close-button {
      padding: 1rem;
      font-size: 0.8rem;
      opacity: 0.6;
    }

    &.Toastify__toast--success {
      .Toastify__progress-bar {
        background: ${p => computedThemeStyle(p).variants.success};
      }
    }

    &.Toastify__toast--error {
      .Toastify__progress-bar {
        background: ${p => computedThemeStyle(p).variants.error};
      }
    }

    &.Toastify__toast--warning {
      .Toastify__progress-bar {
        background: ${p => computedThemeStyle(p).variants.warning};
      }
    }

    &.Toastify__toast--info {
      .Toastify__progress-bar {
        background: ${p => computedThemeStyle(p).variants.info};
      }
    }
  }
`;

Toaster.defaultProps = {
  theme,
  themeKey: 'Toaster',
};

export default Toaster;
