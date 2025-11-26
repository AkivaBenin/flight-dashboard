import React from 'react';

interface Props {
    value: number;
}

export const CompassGauge: React.FC<Props> = ({ value }) => {
    return (
        <div className="his-wrapper">
            <h3>HIS: {value}°</h3>
            <div className="his-container">
                <span className="compass-label n-0">0</span>
                <span className="compass-label e-90">90</span>
                <span className="compass-label s-180">180</span>
                <span className="compass-label w-270">270</span>

                <div
                    className="needle-wrapper"
                    style={{ transform: `rotate(${value}deg)` }}
                >
                    <div className="needle-arrow"></div>
                </div>
            </div>
        </div>
    );
};