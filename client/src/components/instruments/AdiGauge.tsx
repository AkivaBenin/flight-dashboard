import React from 'react';

interface Props {
    value: number;
}

export const AdiGauge: React.FC<Props> = ({ value }) => {

    // logic to changing the colors based on the value .
    const getColor = (val: number) => {
        const r = 0;
        const g = Math.round(255 - (val * 2.55)); // the color green goes down
        const b = Math.round(val * 2.55); // the color blue goes up
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="adi-wrapper">
            <h3>ADI: {value}</h3>
            <div
                className="adi-circle"
                style={{ backgroundColor: getColor(value) }}
            >
                {value}
            </div>
        </div>
    );
};