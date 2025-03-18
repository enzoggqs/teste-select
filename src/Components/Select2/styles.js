import styled, { css } from 'styled-components';
import { sg } from 'sbwb-ds';

export function hexToRgb(hex) {
    // Remove o # do início, se estiver presente
    const cleanHex = hex.replace(/^#/, '');
  
    // Verifica se o valor hex tem 6 caracteres
    if (cleanHex.length !== 6) {
      return 'Formato inválido';
    }
  
    // Converte hex em valores RGB
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
  
    return `${r}, ${g}, ${b}`;
}

export const resetStyles = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
`;

export const SelectContainer = styled.div`
  ${resetStyles}
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;


export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['tableSelect', 'tableDensity', 'hasSuccess', 'isOpen', 'hasError'].includes(prop),
})`
  ${resetStyles}
  width: 100%;
  min-height: ${({ size }) => (size === 'Small' ? '32px' : '40px')};
  max-height: ${({ size }) => (size === 'Small' ? '32px' : '40px')};
  display: flex;
  align-items: center;
  border: ${sg.borders.borderWidth.borderWidthThinner} solid;
  border-radius: ${sg.borders.borderRadius.borderRadiusSm};
  border-color: ${({ isOpen, hasError, readonly, tableSelect }) => {
    if (hasError && tableSelect) {
      return 'transparent';
    }
    if (hasError && !tableSelect) {
      return sg.colors.feedbackColors.colorFeedbackError;
    }
    if (readonly) {
      return sg.colors.neutralColors.colorNeutralClean;
    }
    return isOpen
      ? sg.colors.neutralColors.colorNeutralDarkest
      : sg.colors.neutralColors.colorNeutralClean;
  }};
  background-color: ${sg.colors.backgroundColors.colorBackgroundSnow};
  outline: none;
  font-weight: ${sg.fonts.fontWeight.fontWeightRegular};
  padding: ${({ size }) =>
    size !== 'Small'
      ? `0 ${sg.spacings.spacingInline.spacingInlineSm}`
      : `0 ${sg.spacings.spacingInline.spacingInlineAnt}`};

  ${({ size }) => {
    if (size === 'Small') {
      return css`
        font-size: ${sg.fonts.fontSize.fontSizeBodyMd};
        line-height: ${sg.fonts.lineHeight.lineHeightSm(
          sg.fonts.fontSize.fontSizeBodyMd
        )};
      `;
    } else {
      return css`
        font-size: ${sg.fonts.fontSize.fontSizeBodyLg};
        line-height: ${sg.fonts.lineHeight.lineHeightMd(
          sg.fonts.fontSize.fontSizeBodyLg
        )};
      `;
    }
  }}

  ${({ disabled }) => {
    return (
      disabled &&
      css`
        background-color: ${sg.colors.brandColors.colorBrandSeSoft};
        border-style: solid;
      `
    );
  }};

  & > svg {
    ${resetStyles}
    width: ${({ size }) =>
      size === 'Small' ? sg.icons.iconSizeSm : sg.icons.iconSizeAnt};
    height: ${({ size }) =>
      size === 'Small' ? sg.icons.iconSizeSm : sg.icons.iconSizeAnt};

    path {
      fill: ${({ disabled, tableSelect, hasError }) => {
        if (disabled) {
          return sg.colors.neutralColors.colorNeutralCleanest;
        }
        if (tableSelect && hasError && !disabled) {
          return sg.colors.feedbackColors.colorFeedbackError;
        }
        return sg.colors.neutralColors.colorNeutralCloudy;
      }};
    }
  }
  ${({ tableSelect }) => {
    if (tableSelect) {
      return css`
        height: ${({ size, tableDensity }) => {
          if (size === 'Small' && tableDensity === 'normal') {
            return '32px';
          } else if (size === 'Medium' && tableDensity === 'normal') {
            return '40px';
          } else if (size === 'Small' && tableDensity === 'compact') {
            return '22px';
          } else if (size === 'Medium' && tableDensity === 'compact') {
            return '24px';
          }
        }};

        min-height: ${({ size, tableDensity }) => {
          if (size === 'Small' && tableDensity === 'normal') {
            return '32px';
          } else if (size === 'Medium' && tableDensity === 'normal') {
            return '40px';
          } else if (size === 'Small' && tableDensity === 'compact') {
            return '22px';
          } else if (size === 'Medium' && tableDensity === 'compact') {
            return '24px';
          }
        }};

        background-color: ${({
          isOpen,
          errorMessage,
          hasSuccess,
          disabled,
        }) => {
          if (isOpen && !errorMessage && !hasSuccess) {
            return `rgba(${hexToRgb(sg.colors.brandColors.colorBrandSoft)}, ${
              sg.opacityLevels.light
            })`;
          } else if (disabled) {
            return sg.colors.brandColors.colorBrandSeSoft;
          } else if (errorMessage) {
            return `rgba(${hexToRgb(
              sg.colors.feedbackColors.colorFeedbackError
            )}, ${sg.opacityLevels.light})`;
          } else if (hasSuccess) {
            return `rgba(${hexToRgb(
              sg.colors.feedbackColors.colorFeedbackSuccess
            )}, ${sg.opacityLevels.light})`;
          } else {
            return sg.colors.backgroundColors.colorBackgroundSnow;
          }
        }};
        border-radius: 0;
        border: ${({ disabled, isOpen, hasError, hasSuccess }) => {
          if (disabled) return 0;

          if (isOpen) {
            if (hasError)
              return `1px solid ${sg.colors.feedbackColors.colorFeedbackError}`;
            if (hasSuccess)
              return `1px solid ${sg.colors.feedbackColors.colorFeedbackSuccess}`;
            return `${sg.borders.borderWidth.borderWidthThinner} solid ${sg.colors.brandColors.colorBrandSoft}`;
          }

          return `${sg.borders.borderWidth.borderWidthThinner} solid ${sg.colors.backgroundColors.colorBackgroundCarpet}`;
        }};

        border-bottom: ${({ disabled, hasError, hasSuccess }) => {
          if (hasError)
            return `1px solid ${sg.colors.feedbackColors.colorFeedbackError}`;
          if (hasSuccess)
            return `1px solid ${sg.colors.feedbackColors.colorFeedbackSuccess}`;
          if (disabled)
            return `${sg.borders.borderWidth.borderWidthThinner} solid ${sg.colors.neutralColors.colorNeutralClean}`;
          return '';
        }};

        border-right: ${({ disabled }) =>
          disabled
            ? `${sg.borders.borderWidth.borderWidthThinner} solid ${sg.colors.neutralColors.colorNeutralClean}`
            : ''};

        border-top: ${({ disabled, isOpen, hasError, hasSuccess }) =>
          !disabled && !hasError && !hasSuccess && !isOpen ? 0 : ''};

        border-left: ${({ disabled, isOpen, hasError, hasSuccess }) =>
          !disabled && !hasError && !hasSuccess && !isOpen ? 0 : ''};

        &:focus {
          outline: none;
        }

        ${({ hasError }) => {
          if (hasError) {
            return css`
              background-color: #fff5f5;
            `;
          }
        }}
      `;
    }
  }}
    &:hover {
    background-color: ${({ disabled, hasError, hasSuccess, isOpen }) => {
      if (!disabled && !hasError && !hasSuccess && !isOpen)
        return sg.colors.backgroundColors.colorBackgroundCarpet;
    }}
`;

export const SelectValue = styled.div`
  ${resetStyles}
  align-items: center;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  overflow: hidden;
  min-height: 1em;
  box-sizing: border-box;
`;

export const Value = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !['variant', 'tableDensity'].includes(prop),
})`
  ${resetStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: fit-content;
  max-width: calc(100% - 20px);
  color: ${sg.colors.neutralColors.colorNeutralDark};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ size, tableDensity, variant, fontSize }) => {
    if (fontSize) {
      return fontSize;
    }
    if (
      size === 'Small' &&
      tableDensity === 'normal' &&
      variant === 'default'
    ) {
      return sg.fonts.fontSize.fontSizeBodyMd;
    } else if (
      size === 'Medium' &&
      tableDensity === 'normal' &&
      variant === 'default'
    ) {
      return sg.fonts.fontSize.fontSizeBodyLg;
    } else if (
      size === 'Medium' &&
      tableDensity === 'normal' &&
      variant === 'table'
    ) {
      return '10px';
    } else {
      return '10px';
    }
  }};

  & > p {
    ${resetStyles}
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    width: fit-content;
    text-align: 'center';
  }

  & > p > svg {
    ${resetStyles}
    ${({ iconPosition }) => {
      if (iconPosition === 'right') {
        return css`
          margin-left: 4px;
        `;
      } else {
        return css`
          margin-right: 4px;
        `;
      }
    }}
    path {
      fill: ${({ iconColor }) => iconColor};
    }
  }

  ${({ tableSelect }) => {
    if (tableSelect) {
      return css`
        font-size: ${({ size, fontSize }) => {
          if (fontSize) {
            return fontSize;
          }
          if (size === 'Small') {
            return '10px';
          } else if (size === 'Medium') {
            return '12px';
          }
        }};
      `;
    }
  }}
`;

export const Placeholder = styled.span`
  ${resetStyles}
  & > svg {
    ${resetStyles}
    ${({ iconPosition }) => {
      if (iconPosition === 'right') {
        return css`
          margin-left: 4px;
        `;
      } else {
        return css`
          margin-right: 4px;
        `;
      }
    }}
    path {
      ${resetStyles}
      fill: ${({ iconColor }) => iconColor};
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ disabled }) => {
    if (disabled) {
      return sg.colors.neutralColors.colorNeutralCloudy;
    } else {
      return sg.colors.neutralColors.colorNeutralCleanest;
    }
  }};
  font-size: ${({ size, fontSize }) =>
    fontSize
      ? fontSize
      : size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodyMd
      : sg.fonts.fontSize.fontSizeBodyLg};
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
`;

export const Input = styled.input`
  ${resetStyles}
  flex: 1;
  min-width: 1px;
  border: none;
  background-color: transparent;

  color: ${sg.colors.neutralColors.colorNeutralDark};
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodyMd
      : sg.fonts.fontSize.fontSizeBodyLg};

  &:focus,
  &:hover {
    outline: none;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;

export const Label = styled.label`
  ${resetStyles}
  display: flex;
  font-size: ${sg.fonts.fontSize.fontSizeBodyMd};
  font-weight: ${sg.fonts.fontWeight.fontWeightRegular};
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
  line-height: ${sg.fonts.lineHeight.lineHeightSm(
    sg.fonts.fontSize.fontSizeBodyMd
  )};
  color: ${sg.colors.neutralColors.colorNeutralCloudy};
  margin-bottom: ${sg.spacings.spacingStack.spacingStackNano};
`;

export const ErrorText = styled.p`
  ${resetStyles}
  display: inline-block;
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodySm
      : sg.fonts.fontSize.fontSizeBodyMd};
  font-weight: ${sg.fonts.fontWeight.fontWeightRegular};
  color: ${sg.colors.feedbackColors.colorFeedbackError};
  margin-top: ${sg.spacings.spacingInline.spacingInlineNano};
  width: 100%;
`;

export const HelpText = styled.p`
  ${resetStyles}
  display: inline-block;
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodySm
      : sg.fonts.fontSize.fontSizeBodyMd};
  font-weight: ${sg.fonts.fontWeight.fontWeightRegular};
  color: ${sg.colors.neutralColors.colorNeutralDark};
  margin-top: ${sg.spacings.spacingInline.spacingInlineNano};
  width: 100%;
`;

export const StyledSpan = styled.span`
  ${resetStyles}
  margin-left: ${(props) => (props.hasError ? '5px' : '0')};
`;
export const Asterisk = styled.div`
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0%;
  color: ${sg.colors.feedbackColors.colorFeedbackError};
  margin-left: 4px;
`;
