import React from 'react';

const Square = ({ colorValue, hexValue, isDarkColor }) => {
    return (
        <session
            className="square"
            style={{
                backgroundColor: colorValue,
                color: isDarkColor ? '#000' : '#FFF',
            }}
        >
            <p>{colorValue ? colorValue : 'Empty Value'}</p>
            <p>{hexValue ? hexValue : null}</p>
        </session>
    );
};

Square.defaultProps = {
    colorValue: 'Empty Color Value',
};

export default Square;
