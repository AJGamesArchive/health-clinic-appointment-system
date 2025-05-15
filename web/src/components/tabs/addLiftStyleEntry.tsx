import './addLifeStyleEntry.css';
import React, { useState } from "react";

interface AddEntryProps {
  onClose: () => void;
}

const entryTypes = [
    "Smoking Status",
    "Alcohol Consumption",
    "Recreational Drug Usage",
    "Exercise Frequency",
    "Sleep Quality",
    "Social Support",
    "Travel History",
    "Family Conditions",
    "Environmental Factors",
];

const AddEntry: React.FC<AddEntryProps> = ({ onClose }) => {

    const [selectedType, setSelectedType] = useState<string>("");

    const renderEntryForm = () => {
        switch (selectedType) {
            case "Smoking Status":
                return(
                
                <div className="smoking-status">
                <input
                 type="text" 
                 name="smokingStatus" 
                 placeholder='Smoking Status'
                 />
                <input
                  type="date" 
                  name="statusAsOf" 
                  placeholder='Status As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>    
                ); 
            case "Alcohol Consumption":
                return (
                <div className="alcohol-consumption">
                <input
                 type="text" 
                 name="alcoholConsumption" 
                 placeholder='Alcohol Consumption'
                 />
                <input
                  type="date" 
                  name="consumptionAsOf" 
                  placeholder='Consumption As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                  />
                </div>
                );
            case "Recreational Drug Usage":
                return (
                <div className="recreational-drug-usage">
                <input
                 type="text" 
                 name="recreationalDrugUsage"
                  placeholder='Recreational Drug Usage'
                />
                <input
                  type="text" 
                  name="usage" 
                  placeholder='Usage'
                />
                <input
                  type="date" 
                  name="useAsOf" 
                  placeholder='Use As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            case "Exercise Frequency":
                return (
                <div className="exercise-frequency">
                <input
                 type="text" 
                 name="exerciseFrequency" 
                 placeholder='Exercise Frequency'
                />
                <input
                  type="text" 
                  name="frequency" 
                  placeholder='Frequency'
                />
                <input
                  type="date" 
                  name="frequencyAsOf" 
                  placeholder='Frequency As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                )
            case "Sleep Quality":
                return (
                <div className="sleep-quality">
                <input
                 type="text" 
                 name="sleepQuality" 
                 placeholder='Sleep Quality'
                />
                <input
                  type="date" 
                  name="qualityAsOf" 
                  placeholder='Quality As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            case "Social Support":
                return (
                <div className="social-support">
                <input
                 type="text" 
                 name="socialSupport" 
                 placeholder='Social Support'
                />
                <input
                  type="date" 
                  name="supportAsOf" 
                  placeholder='Support As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            case "Travel History":
                return (
                <div className="travel-history">
                <input
                 type="text" 
                 name="travelHistory" 
                 placeholder='Travel History'
                />
                <input
                  type="date" 
                  name="date" 
                  placeholder='Date'
                />
                <input
                  type="text" 
                  name="duration" 
                  placeholder='Duration'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            case "Family Conditions":
                return (
                <div className="family-conditions">
                <input
                 type="text" 
                 name="familyConditions" 
                 placeholder='Family Conditions'
                />
                <input
                  type="text" 
                  name="typicalCause" 
                  placeholder='Typical Cause'
                />
                <input
                  type="number" 
                  name="typicalAgeOfDiagnosis" 
                  placeholder='Typical Age Of Diagnosis'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            case "Environmental Factors":
                return (
                <div className="environmental-factors">
                <input
                 type="text" 
                 name="environmentalFactors" 
                 placeholder='Environmental Factors'
                />
                <input
                  type="text" 
                  name="exposure" 
                  placeholder='Exposure'
                />
                <input
                  type="date" 
                  name="exposureAsOf" 
                  placeholder='Exposure As Of'
                />
                <input
                  type="text" 
                  name="notes"
                  placeholder='Notes'
                />
                </div>
                );
            default:
                return null;
        }
    }

     return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="add-entry-modal">
        <h2>Add Lifestyle Entry</h2>
        <label>Select Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">-- Select --</option>
          {entryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <form className="entry-form">
          {renderEntryForm()}
          <button type="submit">Save Entry</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};
export default AddEntry;