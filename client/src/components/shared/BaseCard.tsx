import React from 'react';

interface Props {
    title: string;
    value: string | number;
}

export const BaseCard: React.FC<Props> = ({ title, value }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <h1>{value}</h1>
        </div>
    );
};