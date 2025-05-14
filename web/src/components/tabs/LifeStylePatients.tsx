import React, { useState } from "react";
import AddEntry from "./addLiftStyleEntry";

const LifeStylePatients: React.FC = () => {
    const [formData, setFormData] = useState({
        
    });

    const [showAddEntry, setShowAddEntry] = useState(false);

    return (
        <div className="Main-Container">
        <div className="core-information">
            <div className="info-item">
                <strong>Smooking Status</strong>
            </div>
            <div className="info-item">
                <strong>Alcohol Consumption</strong>
            </div>
            <div className="info-item">
                <strong>Recrational Drug Usage</strong>
            </div>
             <div className="info-item">
                <strong>Excercise Frequency</strong>
            </div>
             <div className="info-item">
                <strong>Sleep Quality</strong>
            </div>
             <div className="info-item">
                <strong>Social Support</strong>
            </div>
             <div className="info-item">
                <strong>Travel History</strong>
            </div>
             <div className="info-item">
                <strong>Family Conditions</strong>
            </div>
            <div className="info-item">
                <strong>Enviromental Factors</strong>
            </div>
            <div className="info-item">
                <button className="Add-Entry" onClick={() => setShowAddEntry(true)}>Add Entry</button>
            </div>
        </div>
        {showAddEntry && <AddEntry onClose={() => setShowAddEntry(false)} />}
        </div>
    );
};
export default LifeStylePatients;