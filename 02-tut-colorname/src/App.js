import React from 'react';
import Square from './Square';
import Input from './Input';
import { useState } from 'react';

function App() {
    const [colorValue, setColorValue] = useState('');
    const [hexValue, setHexValue] = useState('');
    const [isDarkColor, setIsDarkColor] = useState(true);

    return (
        <div className="App">
            <Square
                colorValue={colorValue}
                hexValue={hexValue}
                isDarkColor={isDarkColor}
            />
            <Input
                colorValue={colorValue}
                setColorValue={setColorValue}
                hexValue={hexValue}
                setHexValue={setHexValue}
                isDarkColor={isDarkColor}
                setIsDarkColor={setIsDarkColor}
            />
        </div>
    );
}

export default App;
