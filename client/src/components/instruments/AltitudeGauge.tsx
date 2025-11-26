import React from 'react';

interface Props {
    value: number;
}

export const AltitudeGauge: React.FC<Props> = ({ value }) => {
    // calculating the percentage
    const percentage = Math.min((value / 3000) * 100, 100);

    return (
        <div className="alt-wrapper">
            <h3>Alt: {value}</h3>
            <div className="alt-layout">
                <div className="alt-scale">
                    <span>3000</span>
                    <span>2250</span>
                    <span>1500</span>
                    <span>750</span>
                    <span>0</span>
                </div>
                <div className="alt-container">
                    <div
                        className="alt-marker"
                        style={{ bottom: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};