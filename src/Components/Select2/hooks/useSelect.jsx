import { useEffect, useRef, useState } from 'react';

export const useSelect = (handleOption, onSelect, { value, options, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [optionsSelect, setOptionSelect] = useState(options);

  const selectContainerRef = useRef(null);
  const containerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const optionsRef = useRef(null);

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

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (isOpen || expanded) {
        setIsOpen(false);
        setExpanded(false);
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
  }, [isOpen, expanded]);

  function selectOption(option) {
    setInputValue('');
    setIsOpen(!isOpen);
    setExpanded(!expanded);
    inputContainerRef?.current && inputContainerRef.current?.blur();
    if (option !== value) {
      handleOption && handleOption(option);
      onSelect && onSelect(option);
    } else {
      handleOption && handleOption(undefined);
      onSelect && onSelect(undefined);
    }
  }

  const handlerFilterOptions = (name) => {
    if (name) {
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedName, 'i');

      const result = options.filter((option) => {
        const labelText = option.label;
        return regex.test(labelText);
      });

      console.log(regex)

      setOptionSelect(result);
    } else {
      setOptionSelect(options);
    }
  };

  function isValue(valueSelected) {
    return !valueSelected;
  }

  return {
    isOpen,
    setIsOpen,
    expanded,
    setExpanded,
    inputValue,
    setInputValue,
    optionsSelect,
    setOptionSelect,
    selectContainerRef,
    containerRef,
    inputContainerRef,
    optionsRef,
    selectOption,
    handlerFilterOptions,
    isValue,
  };
};
