import { useEffect, useRef, useState } from 'react';

const findScrollContainer = (element) => {
  if (!element) return document.documentElement;
  const { overflowY } = window.getComputedStyle(element);
  if (overflowY === 'auto' || overflowY === 'scroll') return element;
  return findScrollContainer(element.parentElement);
};

export const useMenuSelect = (selectContainerRef, value, topOffset = 0, bottomOffset = 0) => {
  console.log(topOffset);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [parentWidth, setParentWidth] = useState();
  const optionsRef = useRef(null);

  const place = () => {
    if (!selectContainerRef.current || !optionsRef.current) return;

    const containerRect = selectContainerRef.current.getBoundingClientRect();
    console.log(containerRect);
    const optionsRect = optionsRef.current.getBoundingClientRect();
    console.log(optionsRect);
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

  return {
    highlightedIndex,
    setHighlightedIndex,
    isOptionSelected: (option) => option.label === value?.label,
    optionsRef,
    parentWidth,
  };
};
