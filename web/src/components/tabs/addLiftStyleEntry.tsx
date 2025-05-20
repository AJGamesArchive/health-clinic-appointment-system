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
                  <p>Smoking Status</p>
                <input
                 type="text" 
                 name="smokingStatus" 
                 placeholder='Enter Status'
                 />
                 <p>date</p>
                <input
                  type="date" 
                  name="statusAsOf" 
                  placeholder='Status As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Enter Notes'
                />
                </div>    
                ); 
            case "Alcohol Consumption":
                return (
                <div className="alcohol-consumption">
                  <p>Alcohol Consumption</p>
                <input
                 type="text" 
                 name="alcoholConsumption" 
                 placeholder=' Enter Alcohol Consumption'
                 />
                 <p>Date</p>
                <input
                  type="date" 
                  name="consumptionAsOf" 
                  placeholder='Consumption As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Enter Notes'
                  />
                </div>
                );
            case "Recreational Drug Usage":
                return (
                <div className="recreational-drug-usage">
                <p>Recreational Drug Usage</p>
                <input
                 type="text" 
                 name="recreationalDrugUsage"
                  placeholder='Add Recreational Drug Usage'
                />
                <p>Usage</p>
                <input
                  type="text" 
                  name="usage" 
                  placeholder='Add Usage'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="useAsOf" 
                  placeholder='Use As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
                />
                </div>
                );
            case "Exercise Frequency":
                return (
                <div className="exercise-frequency">
                <p>Exercise Frequency</p>
                <input
                 type="text" 
                 name="exerciseFrequency" 
                 placeholder='Add Exercise Frequency'
                />
                <p>Frequency</p>
                <input
                  type="text" 
                  name="frequency" 
                  placeholder='Add Frequency'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="frequencyAsOf" 
                  placeholder='Frequency As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
                />
                </div>
                )
            case "Sleep Quality":
                return (
                <div className="sleep-quality">
                <p>Sleep Quality</p>
                <input
                 type="text" 
                 name="sleepQuality" 
                 placeholder='Add Sleep Quality'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="qualityAsOf" 
                  placeholder='Quality As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
                />
                </div>
                );
            case "Social Support":
                return (
                <div className="social-support">
                <p>Social Support</p>
                <input
                 type="text" 
                 name="socialSupport" 
                 placeholder='Add Social Support'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="supportAsOf" 
                  placeholder='Support As Of'
                />
                <p>notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
                />
                </div>
                );
            case "Travel History":
                return (
                <div className="travel-history">
                <p>Travel History</p>
                <input
                 type="text" 
                 name="travelHistory" 
                 placeholder='Travel History'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="date" 
                  placeholder='Date'
                />
                <p>Duration</p>
                <input
                  type="text" 
                  name="duration" 
                  placeholder='Duration'
                />
                <p>Notes</p>
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
                <p>Family Conditions</p>
                <input
                 type="text" 
                 name="familyConditions" 
                 placeholder='Family Conditions'
                />
                <p>Cause</p>
                <input
                  type="text" 
                  name="typicalCause" 
                  placeholder='Typical Cause'
                />
                <p>Age of Diagnosis</p>
                <input
                  type="number" 
                  name="typicalAgeOfDiagnosis" 
                  placeholder='Typical Age Of Diagnosis'
                />
                <p>Notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
                />
                </div>
                );
            case "Environmental Factors":
                return (
                <div className="environmental-factors">
                <p>Environmental Factors</p>
                <input
                 type="text" 
                 name="environmentalFactors" 
                 placeholder='Add Environmental Factors'
                />
                <p>Exposure</p>
                <input
                  type="text" 
                  name="exposure" 
                  placeholder='Add Exposure'
                />
                <p>Date</p>
                <input
                  type="date" 
                  name="exposureAsOf" 
                  placeholder='Exposure As Of'
                />
                <p>Notes</p>
                <input
                  type="text" 
                  name="notes"
                  placeholder='Add Notes'
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