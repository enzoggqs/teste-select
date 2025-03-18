import React, { forwardRef, useRef, useState, useEffect } from "react";
import * as C from "./styles";
import { Icon } from "sbwb-ds";

const Select = forwardRef(({ options, maxItems = 5, placeholder = "Selecione...", label, size = "Medium", onChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

 
  const getFilteredOptions = () => {
    if (!inputValue) return options.slice(0, maxItems);
    return options
      .filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, maxItems);
  };

  
  const selectOption = (option) => {
    setInputValue(option.label);
    if (onChange) onChange(option.label);
    closeDropdown();
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "200px" }}>
      <label>{label}</label>
      <div>
        <div>
          <span>Poço</span>
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (onChange) onChange(e.target.value);
              setIsOpen(true);
            }}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        {/* <Icon
          iconName={isOpen ? `ExpandLess${size === "Small" ? "Sm" : "Ant"}` : `ExpandMore${size === "Small" ? "Sm" : "Ant"}`}
          color="colorNeutralCloudy"
        /> */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "white",
              border: "1px solid #ccc",
              borderTop: "none",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {getFilteredOptions().map((option) => (
              <div
                key={option.label}
                onClick={() => selectOption(option)}
                style={{ padding: "8px", cursor: "pointer", color: "black" }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default Select;
