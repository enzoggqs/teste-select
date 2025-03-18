import { sg } from 'sbwb-ds';
import styled, { css } from 'styled-components';

export const resetStyles = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
`;

export const Options = styled.ul`
  ${resetStyles}
  margin-top: ${({ marginTop }) => marginTop};
  padding: ${sg.spacings.spacingStack.spacingStackXs} 4px
    ${sg.spacings.spacingStack.spacingStackSm} 0;
  list-style: none;
  display: block;
  max-height: 25.6rem;
  overflow-y: auto;
  border-radius: ${sg.borders.borderRadius.borderRadiusSm};
  box-shadow: ${sg.shadows.shadowLevelNear};
  width: ${({ width }) => width};
  height: ${({ maxHeight }) => maxHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  z-index: 1000;
  background-color: ${sg.colors.backgroundColors.colorBackgroundSnow};

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${sg.colors.neutralColors.colorNeutralSoft};
    border-radius: ${sg.borders.borderRadius.borderRadiusPill};
  }

  ::-webkit-scrollbar-thumb {
    background: ${sg.colors.neutralColors.colorNeutralClean};
    border-radius: ${sg.borders.borderRadius.borderRadiusPill};
  }
`;

export const EmptyOption = styled.li`
  ${resetStyles}
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodyMd
      : sg.fonts.fontSize.fontSizeBodyLg};
  padding: ${sg.spacings.spacingInline.spacingInlineXs};
  margin: 0 ${sg.spacings.spacingInline.spacingInlineXs};
  cursor: default;
  color: ${sg.colors.neutralColors.colorNeutralDark};
`;

export const Option = styled.li`
  ${resetStyles}
  display: flex;
  flex: 2;
  flex-direction: ${({ menuOptionFlexDirection }) => menuOptionFlexDirection};
  align-items: ${({ menuJustifyContent }) => menuJustifyContent};
  justify-content: ${({ tableActionButton }) =>
    tableActionButton ? 'flex-start' : 'center'};
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodyMd
      : sg.fonts.fontSize.fontSizeBodyLg};
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};

  color: ${({ isOptionSelected, disabled }) => {
    if (disabled) {
      return sg.colors.neutralColors.colorNeutralCleanest;
    } else if (isOptionSelected) {
      return sg.colors.brandColors.colorBrandPrimary;
    } else {
      return sg.colors.neutralColors.colorNeutralDark;
    }
  }};
  font-weight: ${({ isOptionSelected }) =>
    isOptionSelected
      ? sg.fonts.fontWeight.fontWeightSemiBold
      : sg.fonts.fontWeight.fontWeightRegular};
  min-width: 0;

  & > p {
    display: -webkit-box;
    ${({ truncateText }) =>
      truncateText &&
      css`
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      `}
    text-overflow: ellipsis;
  }
`;

export const SectionOptions = styled.li`
  ${resetStyles}
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodySm
      : sg.fonts.fontSize.fontSizeBodyMd};
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
  font-weight: ${sg.fonts.fontWeight.fontWeightSemiBold};
  color: ${sg.colors.neutralColors.colorNeutralCleanest};
  padding: 0 ${sg.spacings.spacingInline.spacingInlineXs};
`;

export const HighlightedText = styled.span`
  ${resetStyles}
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};
  font-size: ${({ size }) =>
    size === 'Small'
      ? sg.fonts.fontSize.fontSizeBodyMd
      : sg.fonts.fontSize.fontSizeBodyLg};
  font-weight: ${sg.fonts.fontWeight.fontWeightSemiBold};
`;

export const ContentHighlightedText = styled.div`
  ${resetStyles}
  display: flex;
  font-family: ${sg.fonts.fontFamily.fontFamilyPrimary};

  & > p {
    width: 100%;
    ${({ truncateText }) =>
      truncateText &&
      css`
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      `}
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
  }
`;

export const Container = styled.div`
  ${resetStyles}
  display: flex;
  flex-direction: row;
  padding: ${({ menuLateralPadding }) =>
    menuLateralPadding
      ? `0 ${menuLateralPadding}`
      : `0 ${sg.spacings.spacingInline.spacingInlineXs}`};
  margin: 0 ${sg.spacings.spacingInline.spacingInlineXs};
  cursor: ${({ isOptionSelected, disabled }) =>
    isOptionSelected || disabled ? 'default' : 'pointer'};
  background-color: ${({ highlightedIndex, disabled }) => {
    if (highlightedIndex) {
      if (disabled) {
        return sg.colors.backgroundColors.colorBackgroundSnow;
      }
      return sg.colors.neutralColors.colorNeutralLight;
    } else {
      return sg.colors.backgroundColors.colorBackgroundSnow;
    }
  }};
  border-radius: ${sg.borders.borderRadius.borderRadiusSm};
  min-height: ${({ size }) => (size === 'Small' ? '28px' : '40px')};
`;

export const IconContainer = styled.div`
  ${resetStyles}
  padding: ${({ iconPosition }) => {
    return iconPosition === 'left'
      ? `0 ${sg.spacings.spacingInline.spacingInlineNano} 0 0`
      : `0 0 0 ${sg.spacings.spacingInline.spacingInlineNano}`;
  }};
  margin: 0;
  display: flex;
  align-self: center;
`;
