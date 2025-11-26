import React, { useState } from 'react';
import { TelemetryModel } from '../../models/TelemetryModel';

interface Props {
    currentData: TelemetryModel;
    onClose: () => void;
    onSend: (data: TelemetryModel) => void;
}

export const UpdateModal: React.FC<Props> = ({ currentData, onClose, onSend }) => {
    //gets the information from the input
    const [form, setForm] = useState<{
        altitude: string | number;
        his: string | number;
        adi: string | number;
    }>({
        altitude: currentData.altitude,
        his: currentData.his,
        adi: currentData.adi
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof form) => {
        // We DO NOT use Number() here. We keep it as a string while the user types.
        setForm({ ...form, [field]: e.target.value });
    };

    const handleValidateAndSend = () => {
        // NOW we convert to numbers to check them
        const valAlt = Number(form.altitude);
        const valHis = Number(form.his);
        const valAdi = Number(form.adi);

        if (valAlt < 0 || valAlt > 3000) {
            alert("שגיאה: ערך הגובה (Altitude) חייב להיות בין 0 ל-3000");
            return;
        }

        if (valHis < 0 || valHis > 360) {
            alert("שגיאה: ערך הכיוון (HIS) חייב להיות בין 0 ל-360");
            return;
        }

        if (valAdi < 0 || valAdi > 100) {
            alert("שגיאה: ערך מד האופק (ADI) חייב להיות בין 0 ל-100");
            return;
        }

        // If valid, we create the proper object and send it
        const finalData = new TelemetryModel();
        finalData.altitude = valAlt;
        finalData.his = valHis;
        finalData.adi = valAdi;

        onSend(finalData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{marginTop:0}}>Update Data</h2>

                <div className="input-group">
                    <label>Altitude (0-3000):</label>
                    <input
                        type="number"
                        value={form.altitude}
                        onChange={(e) => handleChange(e, 'altitude')}
                    />
                </div>
                <div className="input-group">
                    <label>HIS (0-360):</label>
                    <input
                        type="number"
                        value={form.his}
                        onChange={(e) => handleChange(e, 'his')}
                    />
                </div>
                <div className="input-group">
                    <label>ADI (0-100):</label>
                    <input
                        type="number"
                        value={form.adi}
                        onChange={(e) => handleChange(e, 'adi')}
                    />
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button onClick={handleValidateAndSend} style={{background: '#4CAF50', flex: 1}}>Send</button>
                    <button onClick={onClose} style={{background: '#f44336', flex: 1}}>Cancel</button>
                </div>
            </div>
        </div>
    );
};