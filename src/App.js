import React, { useState } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker';

function App() {

	const [selectedColor, onChangeSelectedColor] = useState('#000000');

	const colors = [
		{ name: "Red", value: "#E12029" },
		{ name: "Yellow", value: "#E9B33F" },
		{ name: "Green", value: "#17A358" },
		{ name: "Blue", value: "#1CAFEA" }
	];

	return (
		<div className="App">
			<ColorPicker value={selectedColor} onChange={onChangeSelectedColor} colors={colors} />
		</div>
	);
}

export default App;