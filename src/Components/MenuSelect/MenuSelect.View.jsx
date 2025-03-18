import * as C from './styles';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Icon, sg } from 'sbwb-ds';

const findScrollContainer = (element) => {
  if (!element) return document.documentElement;
  const { overflowY } = window.getComputedStyle(element);
  if (overflowY === 'auto' || overflowY === 'scroll') return element;
  return findScrollContainer(element.parentElement);
};

const MenuSelect = forwardRef((props, ref) => {
    let { 
        selectContainerRef,
        optionsSelect,
        size,
        selectOption,
        value,
        inputValue,
        widthMenu,
        maxHeightMenu,
        menuIsOpen,
        onEnter,
        marginTop = '4px',
        iconName,
        iconColor,
        iconPosition = 'right',
        topOffset = 0,
        bottomOffset = 0,
        truncateText = true,
        menuJustifyContent = 'flex-start',
        tableActionButton,
        menuLateralPadding = '8px',
        menuOptionFlexDirection = 'column',
    } = props;

    console.log(optionsSelect)

    iconName = iconName ? iconName + 'Ant' : '';

    // Estados e refs que estavam no hook agora estão aqui
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [parentWidth, setParentWidth] = useState();
    const optionsRef = useRef(null);

    const isOptionSelected = (option) => option.label === value?.label;

    const place = () => {
        if (!selectContainerRef.current || !optionsRef.current) return;

        const containerRect = selectContainerRef.current.getBoundingClientRect();
        const optionsRect = optionsRef.current.getBoundingClientRect();
        const scrollContainer = findScrollContainer(selectContainerRef.current);
        
        const viewportHeight = window.innerHeight;
        const topSpace = containerRect.top;
        const bottomSpace = viewportHeight - containerRect.bottom;

        const shouldOpenUp = bottomSpace < optionsRect.height + bottomOffset && topSpace > bottomSpace;
        
        let top;
        if (shouldOpenUp) {
          top = containerRect.top - optionsRect.height - topOffset;
          optionsRef.current.style.maxHeight = `${topSpace - topOffset}px`;
        } else {
          top = containerRect.bottom + bottomOffset;
          optionsRef.current.style.maxHeight = `${bottomSpace - bottomOffset}px`;
        }

        let left = containerRect.left;
        const rightOverflow = left + optionsRect.width - window.innerWidth;
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
    };

    console.log('entrou')

    useEffect(() => {
      setHighlightedIndex(0);
      setParentWidth(selectContainerRef.current?.clientWidth);
      place();

      const handleChange = () => place();
      window.addEventListener('scroll', handleChange, true);
      window.addEventListener('resize', handleChange);

      return () => {
        window.removeEventListener('scroll', handleChange, true);
        window.removeEventListener('resize', handleChange);
      };
    }, [selectContainerRef, topOffset, bottomOffset]);

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (menuIsOpen) {
          if (event.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) =>
              prevIndex < optionsSelect.length - 1 ? prevIndex + 1 : prevIndex
            );
          } else if (event.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : 0
            );
          } else if (event.key === 'Enter' && optionsSelect[highlightedIndex]) {
            const selectedOption = optionsSelect[highlightedIndex];
            selectOption(selectedOption);
            onEnter && onEnter(selectedOption);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [menuIsOpen, optionsSelect, highlightedIndex, onEnter]);

    return (
      <C.Options
        marginTop={marginTop}
        width={widthMenu ?? `${parentWidth}px`}
        maxHeight={maxHeightMenu}
        ref={(el) => {
          optionsRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        data-testid="MenuSelect"
        id="MenuSelect"
      >
        {optionsSelect.length === 0 ? (
          <C.EmptyOption size={size}>Sem opções</C.EmptyOption>
        ) : (
          optionsSelect.map((option, index) => {
            const renderContent =
              typeof option.render === 'function' ? option.render() : null;
            
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
                <C.Container
                  key={String(option.value)}
                  isOptionSelected={isOptionSelected(option)}
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
                    isOptionSelected={isOptionSelected(option)}
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
                </C.Container>
              );
            }
          })
        )}
      </C.Options>
    );
  }
);

export default MenuSelect;
