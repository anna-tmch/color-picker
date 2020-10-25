import React, { useState, useEffect } from 'react'
import useOuterClick from '../hooks/useOuterClick'

export default function ColorPicker({ value, colors, onChange }) {

	const [rangeListHandler, setRangeListHandler] = useState(false);
	const [selectListHandler, setSelectListHandler] = useState(false);
	const [prevColor, setPrevColor] = useState('');
	const [rgb, setRgb] = useState({
		R: '',
		G: '',
		B: ''
	});

	const innerRef = useOuterClick(() => {
		setSelectListHandler(false);
		setRangeListHandler(false);
	});

	const toggleRange = () => {
		setRangeListHandler(prev => !prev);
		setSelectListHandler(false);
		setPrevColor(value);
	}

	const toggleSelect = () => {
		setSelectListHandler(prev => !prev);
		setRangeListHandler(false);
	}

	const toggleWithPrevColor = () => {
		setRangeListHandler(false);
		onChange(prevColor);
	}

	const colorsList = colors.map(item => {
		return (
			<li key={item.name} onClick={() => onChange(item.value)} className="color-item">{item.name}<span style={{ background: item.value }}></span></li>
		)
	});

	const rgbChange = (e) => {
		const { name, value } = e.target;
		setRgb(prev => ({
			...prev,
			[name]: value
		}))
	}

	const changeMainColor = () => {
		onChange(convertToHex(+rgb.R, +rgb.G, +rgb.B));
	}

	useEffect(changeMainColor, [rgb]);
	useEffect(() => {
		convertToRGB(value);
	}, [value]);

	const convertToRGB = (hex) => {
		hex = hex.replace("#", "");
		let R = parseInt(hex.substring(0, 2), 16).toString();
		let G = parseInt(hex.substring(2, 4), 16).toString();
		let B = parseInt(hex.substring(4, 6), 16).toString();
		setRgb({ R: R, G: G, B: B });
	}

	const convertToHex = (R, G, B) => {
		return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
	};

	return (
		<div className="cp-component" ref={innerRef}>
			<input type="text" value={value} className="hex-color" readOnly />
			<div className="cp-range">
				<div className="cp-color" onClick={toggleRange}>
					<span style={{ background: value }}></span>
				</div>
				{rangeListHandler ? <div className="cp-dropdown" tabIndex="0" >
					<div className="range-list">
						<label>
							R
								<input name="R" type="range" min="0" max="255" step="1" value={rgb.R} onChange={(e) => rgbChange(e)} />
						</label>
						<label>
							G
								<input name="G" type="range" min="0" max="255" step="1" value={rgb.G} onChange={(e) => rgbChange(e)} />
						</label>
						<label>
							B
								<input name="B" type="range" min="0" max="255" step="1" value={rgb.B} onChange={(e) => rgbChange(e)} />
						</label>
						<div className="button-group">
							<button onClick={() => toggleWithPrevColor()} className="btn-cancel">Cancel</button>
							<button onClick={() => toggleRange()} className="btn-confirm">OK</button>
						</div>
					</div>
				</div> : null}
			</div>
			<div className="cp-select" onClick={toggleSelect}>
				{selectListHandler ? <div className="cp-dropdown" >
					<ul className="color-list">
						{colorsList}
					</ul>
				</div> : null}
			</div>
		</div>
	)
}
