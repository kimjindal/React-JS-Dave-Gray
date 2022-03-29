import React from 'react';
import colornames from 'colornames';

const Input = ({
    colorValue,
    setColorValue,
    setHexValue,
    isDarkColor,
    setIsDarkColor,
}) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Add Color Name:</label>
            <input
                autoFocus
                required
                type="text"
                placeholder="Add color name"
                value={colorValue}
                onChange={(e) => {
                    setColorValue(e.target.value);
                    setHexValue(colornames(e.target.value));
                }}
            />
            <button type="button" onClick={() => setIsDarkColor(!isDarkColor)}>
                Toggle Text Color
            </button>
        </form>
    );
};

export default Input;
