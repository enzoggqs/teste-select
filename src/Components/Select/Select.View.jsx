import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import * as C from './styles';
import { Tooltip, Icon } from 'sbwb-ds';

const findScrollContainer = (element) => {
  if (!element) return document.documentElement;
  const { overflowY } = window.getComputedStyle(element);
  if (overflowY === 'auto' || overflowY === 'scroll') return element;
  return findScrollContainer(element.parentElement);
};

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
    iconName,
    iconColor,
    iconPosition = 'right',
    truncateText = true,
    menuJustifyContent = 'flex-start',
    tableActionButton,
    menuLateralPadding = '8px',
    menuOptionFlexDirection = 'column',
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    highlightedIndex,
    setHighlightedIndex,
  } = props;

  const selectContainerRef = useRef(null);
  const containerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const optionsRef = useRef(null);

  const hasError = !!errorMessage;
  const hasSuccess = !!successMessage;

  const findScrollableContainers = (element) => {
    const scrollableContainers = [];
    let currentElement = element;

    while (currentElement && currentElement !== document.documentElement) {
      const computedStyle = window.getComputedStyle(currentElement);
      const overflowY = computedStyle.overflowY;

      if (overflowY === 'scroll' || overflowY === 'auto') {
        scrollableContainers.push(currentElement);
      }

      currentElement = currentElement.parentElement;
    }

    return scrollableContainers;
  };

  const handleInputBlur = () => {
    if (!isOpen) {
      setInputValue('');
    }
  };

  function selectOption(option) {
    setInputValue('');
    setIsOpen(!isOpen);
    inputContainerRef?.current && inputContainerRef.current?.blur();
    if (option !== value) {
      handleOption && handleOption(option);
      onSelect && onSelect(option);
    } else {
      handleOption && handleOption(undefined);
      onSelect && onSelect(undefined);
    }
  }

  const handleFilterOptions = (name) => {
    if (!name) return options;
  
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedName, 'i');
  
    return options.filter((option) => regex.test(option.label));
  };

  const filteredOptions = useMemo(() => handleFilterOptions(inputValue), [inputValue, options]);

  function isValue(valueSelected) {
    return !valueSelected;
  }

  const place = () => {
    if (!selectContainerRef.current || !optionsRef.current) return;

    let containerRect = selectContainerRef.current.getBoundingClientRect();
    let optionsRect = optionsRef.current.getBoundingClientRect();
    let scrollContainer = findScrollContainer(selectContainerRef.current);

    let viewportHeight = window.innerHeight;
    let topSpace = containerRect.top;
    let bottomSpace = viewportHeight - containerRect.bottom;

    let shouldOpenUp = bottomSpace < optionsRect.height + bottomOffset && topSpace > bottomSpace;

    let top;
    if (shouldOpenUp) {
      top = containerRect.top - optionsRect.height - topOffset;
      optionsRef.current.style.maxHeight = `${topSpace - topOffset}px`;
    } else {
      top = containerRect.bottom + bottomOffset;
      optionsRef.current.style.maxHeight = `${bottomSpace - bottomOffset}px`;
    }

    let left = containerRect.left;
    let rightOverflow = left + optionsRect.width - window.innerWidth;
    if (rightOverflow > 0) {
      left -= rightOverflow;
    }
    if (left < 0) left = 0;

    Object.assign(optionsRef.current.style, {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${Math.max(containerRect.width, optionsRect.width)}px`,
      overflowY: 'auto',
    });

    containerRect = selectContainerRef.current.getBoundingClientRect();
    optionsRect = optionsRef.current.getBoundingClientRect();
    scrollContainer = findScrollContainer(selectContainerRef.current);

    viewportHeight = window.innerHeight;
     topSpace = containerRect.top;
     bottomSpace = viewportHeight - containerRect.bottom;

    shouldOpenUp = bottomSpace < optionsRect.height + bottomOffset && topSpace > bottomSpace;

    if (shouldOpenUp) {
      top = containerRect.top - optionsRect.height - topOffset;
      optionsRef.current.style.maxHeight = `${topSpace - topOffset}px`;
    } else {
      top = containerRect.bottom + bottomOffset;
      optionsRef.current.style.maxHeight = `${bottomSpace - bottomOffset}px`;
    }

    Object.assign(optionsRef.current.style, {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${Math.max(containerRect.width, optionsRect.width)}px`,
      overflowY: 'auto',
    });
  };

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const scrollableContainers = findScrollableContainers(selectContainerRef.current);

    scrollableContainers.forEach((container) => {
      container.addEventListener('scroll', handleScrollOrResize, { passive: true });
    });

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      scrollableContainers.forEach((container) => {
        container.removeEventListener('scroll', handleScrollOrResize);
      });

      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(0);
    place();

    const handleChange = () => place();
    window.addEventListener('scroll', handleChange, true);
    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('scroll', handleChange, true);
      window.removeEventListener('resize', handleChange);
    };
  }, [selectContainerRef, topOffset, bottomOffset, isOpen, filteredOptions]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        if (event.key === 'ArrowDown') {
          setHighlightedIndex((prevIndex) =>
            prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (event.key === 'ArrowUp') {
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : 0
          );
        } else if (event.key === 'Enter' && options[highlightedIndex]) {
          const selectedOption = options[highlightedIndex];
          selectOption(selectedOption);
          onEnter && onEnter(selectedOption);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, options, highlightedIndex, onEnter]);

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
                (isOpen) &&
                inputContainerRef.current !== document.activeElement &&
                !isStillWithinComponent
              ) {
                onBlur && onBlur(value);
                setIsOpen(false);
                setInputValue('');
              }
            }, 250);
          }}
          onClick={() => {
            if (!disabled && !readonly) {
              setIsOpen((prev) => !prev);
              if (!isOpen) {
                inputContainerRef?.current?.focus();
              }
            }
          }}
          tabIndex={0}
          size={size}
          isOpen={isOpen}
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
                  }
                  handleFilterOptions(e.target.value);
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

          {isOpen && (
            <C.Options
              marginTop="4px"
              maxHeight={maxHeightMenu}
              ref={optionsRef}
              data-testid="MenuSelect"
              id="MenuSelect"
            >
              {options.length === 0 ? (
                <C.EmptyOption size={size}>Sem opções</C.EmptyOption>
              ) : (
                (maxOptions ? filteredOptions.slice(0, maxOptions) : filteredOptions).map((option, index) => {
                  const renderContent = typeof option.render === 'function' ? option.render() : null;
                  const labelText = option.label;

                  if (option.isSection) {
                    return (
                      <C.SectionOptions key={labelText} size={size}>
                        {labelText}
                      </C.SectionOptions>
                    );
                  } else {
                    const indexMatch = option.label.toLowerCase().indexOf(inputValue);

                    return (
                      <C.ContainerMenuSelect
                        key={String(option.value)}
                        isOptionSelected={option.label === value?.label}
                        highlightedIndex={index === highlightedIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!option.disabled) {
                            selectOption(option);
                          }
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        disabled={option.disabled}
                        size={size}
                        menuLateralPadding={menuLateralPadding}
                      >
                        {iconPosition === 'left' && (
                          <C.IconContainer iconPosition={iconPosition}>
                            <Icon iconName={iconName} color={iconColor} />
                          </C.IconContainer>
                        )}
                        <C.Option
                          menuOptionFlexDirection={menuOptionFlexDirection}
                          menuJustifyContent={menuJustifyContent}
                          iconName={iconName}
                          isOptionSelected={option.label === value?.label}
                          highlightedIndex={index === highlightedIndex}
                          data-testid={option.value}
                          size={size}
                          hasDescription={!!option.description}
                          optionValue={option.value}
                          disabled={option.disabled}
                          truncateText={truncateText}
                          tableActionButton={tableActionButton}
                        >
                          {renderContent || <p title={labelText}>{labelText}</p>}
                          {option.description && <p title={option.description}>{option.description}</p>}
                        </C.Option>
                        {iconPosition === 'right' && (
                          <C.IconContainer iconPosition={iconPosition}>
                            <Icon iconName={iconName} color={iconColor} />
                          </C.IconContainer>
                        )}
                      </C.ContainerMenuSelect>
                    );
                  }
                })
              )}
            </C.Options>
          )}
        </C.Container>
      </Tooltip>
      {helpText && variant === 'default' && <C.HelpText size={size}>{helpText}</C.HelpText>}
    </C.SelectContainer>
  );
});

export default Select;