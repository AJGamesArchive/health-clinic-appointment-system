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
                return <div>Smoking Status Form</div>;
            case "Alcohol Consumption":
                return <div>Alcohol Consumption Form</div>;
            case "Recreational Drug Usage":
                return <div>Recreational Drug Usage Form</div>;
            case "Exercise Frequency":
                return <div>Exercise Frequency Form</div>;
            case "Sleep Quality":
                return <div>Sleep Quality Form</div>;
            case "Social Support":
                return <div>Social Support Form</div>;
            case "Travel History":
                return <div>Travel History Form</div>;
            case "Family Conditions":
                return <div>Family Conditions Form</div>;
            case "Environmental Factors":
                return <div>Environmental Factors Form</div>;
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