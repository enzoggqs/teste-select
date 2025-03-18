import React, { forwardRef, useEffect, useRef } from 'react';
import * as C from './styles';
import { useSelect } from './hooks/useSelect'; // Supondo que useSelect seja um hook personalizado
import { Tooltip, Icon } from 'sbwb-ds';
import MenuSelect from '../MenuSelect/MenuSelect.View';

const Select = forwardRef((props, ref) => {
  const {
    value,
    handleOption,
    onSelect,
    onChange,
    options,
    maxOptions,
    filter = true,
    placeholder,
    label,
    size = 'Medium',
    width = '100%',
    disabled,
    helpText,
    readonly,
    errorMessage,
    tooltipPosition,
    tooltipMaxWidth,
    tooltipIsVisible = false,
    tooltipProps = {},
    onBlur,
    onEnter,
    variant = 'default',
    tableDensity = 'normal',
    topOffset = 0,
    bottomOffset = 0,
    fontSize,
    fontWeight = '400',
    successMessage,
    maxHeightMenu,
    isRequired = false,
  } = props;

  const {
    isOpen,
    setIsOpen,
    expanded,
    setExpanded,
    inputValue,
    setInputValue,
    optionsSelect,

    selectContainerRef,
    containerRef,
    inputContainerRef,

    selectOption,
    setOptionSelect,
    handlerFilterOptions,
    isValue,
  } = useSelect(onSelect, handleOption, { value, options, size });

  const hasError = !!errorMessage;
  const hasSuccess = !!successMessage;

  const handleInputBlur = () => {
    if (!isOpen && !expanded) {
      setInputValue('');
    }
  };

  useEffect(() => {
    console.log('chamou aq tb')
  }, [selectContainerRef])

  return (
    <C.SelectContainer ref={selectContainerRef} width={width} disabled={disabled}>
      {label && variant === 'default' && (
        <C.Label ref={ref}>
          {label}
          {isRequired && <C.Asterisk>*</C.Asterisk>}
        </C.Label>
      )}
      <Tooltip
        isActive={hasError && variant === 'default'}
        errorTooltip={hasError}
        label={errorMessage || successMessage}
        position={tooltipPosition}
        maxWidth={tooltipMaxWidth}
        isAlwaysVisible={tooltipIsVisible}
        wrapperWidth="auto"
        {...tooltipProps}
      >
        <C.Container
          tableSelect={variant === 'table'}
          tableDensity={tableDensity}
          hasError={hasError}
          hasSuccess={hasSuccess}
          readonly={readonly}
          ref={containerRef}
          onBlur={() => {
            setTimeout(() => {
              const selectContainer = selectContainerRef.current;
              const activeElement = document.activeElement;
              const isStillWithinComponent = selectContainer?.contains(activeElement);

              if (
                (isOpen || expanded) &&
                inputContainerRef.current !== document.activeElement &&
                !isStillWithinComponent
              ) {
                onBlur && onBlur(value);
                setIsOpen(false);
                setExpanded(false);
                setInputValue('');
              }
            }, 250);
          }}
          onClick={() => {
            if (!disabled && !readonly) {
              if (isOpen && !expanded) {
                setExpanded(true);
                inputContainerRef?.current?.focus();
              } else if (!isOpen && !expanded) {
                setIsOpen(true);
                setExpanded(true);
                inputContainerRef?.current?.focus();
              } else {
                setIsOpen(false);
                setExpanded(false);
                inputContainerRef?.current?.blur();
                setInputValue('');
              }

              !inputValue && setOptionSelect(options);
            }
          }}
          tabIndex={0}
          size={size}
          isOpen={isOpen || expanded}
          data-testid="select"
          disabled={disabled}
        >
          <C.SelectValue>
            <C.Value
              size={size}
              variant={variant}
              tableDensity={tableDensity}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {placeholder && isValue(value) && !inputValue && !isOpen ? (
                <C.Placeholder
                  size={size}
                  error={hasError}
                  success={hasSuccess}
                  tableSelect={variant === 'table'}
                  disabled={disabled}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                >
                  <C.StyledSpan>{placeholder}</C.StyledSpan>
                </C.Placeholder>
              ) : null}

              {inputValue === '' && value?.label && (
                <p title={value?.label}>
                  <C.StyledSpan>{value?.label}</C.StyledSpan>
                </p>
              )}
            </C.Value>

            {filter && (
              <C.Input
                ref={inputContainerRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (onChange) onChange(e.target.value);
                  if (e.target.value.length > 0) {
                    setIsOpen(true);
                    setExpanded(true);
                  }
                  handlerFilterOptions(e.target.value);
                }}
                onBlur={handleInputBlur}
                readOnly={readonly}
                width={inputValue.length}
                size={variant === 'table' ? 'Small' : size}
                disabled={disabled}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && e.target.value === '') {
                    onSelect && onSelect(undefined);
                    handleOption && handleOption(undefined);
                  }
                }}
              />
            )}
          </C.SelectValue>

          <Icon
                iconName={isOpen ? `ExpandLess${size === 'Small' ? 'Sm' : 'Ant'}` : `ExpandMore${size === 'Small' ? 'Sm' : 'Ant'}`}
                color="colorNeutralCloudy"
          />

          {expanded && (
            <MenuSelect
              onEnter={(selectedOption) => {
                onSelect && onSelect(selectedOption);
                handleOption && handleOption(selectedOption);
                setIsOpen(false);
                setExpanded(false);
                onEnter && onEnter(selectedOption);
                setInputValue('');
              }}
              menuIsOpen={isOpen}
              selectContainerRef={selectContainerRef}
              value={value}
              optionsSelect={maxOptions ? optionsSelect.slice(0, maxOptions) : optionsSelect}
              selectOption={selectOption}
              size={variant === 'table' ? 'Small' : size}
              inputValue={inputValue}
              widthMenu={`${selectContainerRef.current?.getBoundingClientRect().width}px`}
              bottomOffset={bottomOffset}
              topOffset={topOffset}
              maxHeightMenu={maxHeightMenu}
            />
          )}
        </C.Container>
      </Tooltip>
      {helpText && variant === 'default' && <C.HelpText size={size}>{helpText}</C.HelpText>}
    </C.SelectContainer>
  );
});

export default Select;
