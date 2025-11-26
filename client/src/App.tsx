// client/src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import { ApiService } from './services/ApiService';
import { TelemetryModel } from './models/TelemetryModel';
import { AltitudeGauge } from './components/instruments/AltitudeGauge';
import { CompassGauge } from './components/instruments/CompassGauge';
import { AdiGauge } from './components/instruments/AdiGauge';
import { BaseCard } from './components/shared/BaseCard';
import { UpdateModal } from './components/shared/UpdateModal';

function App() {
    const [view, setView] = useState<'text' | 'visual'>('text');
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<TelemetryModel>(new TelemetryModel());

    const refreshData = async () => {
        try {
            const result = await ApiService.getTelemetry();
            setData(result);
        } catch (e) {
            console.log("Sync error");
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleSave = async (newData: TelemetryModel) => {
        try {
            await ApiService.sendTelemetry(newData);
            setShowModal(false);
            refreshData();
            alert("Saved!");
        } catch (e) {
            alert("Error saving");
        }
    };

    return (
        <div className="app-container">
            <h1>Flight Dashboard</h1>

            {/* Navigation Buttons */}
            <div className="nav-buttons">
                <button onClick={() => setView('text')}>Text</button>
                <button onClick={() => setView('visual')}>Visual</button>
                <button onClick={() => setShowModal(true)}>+</button>
            </div>

            {/* Text View - Using BaseCard Component */}
            {view === 'text' && (
                <div className="text-view">
                    <BaseCard title="Altitude" value={data.altitude} />
                    <BaseCard title="HIS" value={`${data.his}°`} />
                    <BaseCard title="ADI" value={data.adi} />
                </div>
            )}

            {/* Visual View - Using Specific Components */}
            {view === 'visual' && (
                <div className="visual-view">
                    <AltitudeGauge value={data.altitude} />
                    <CompassGauge value={data.his} />
                    <AdiGauge value={data.adi} />
                </div>
            )}

            {/* Modal Popup */}
            {showModal && (
                <UpdateModal
                    currentData={data}     // <--- ADD THIS LINE (Pass current data)
                    onClose={() => setShowModal(false)}
                    onSend={handleSave}
                />
            )}
        </div>
    );
}

export default App;