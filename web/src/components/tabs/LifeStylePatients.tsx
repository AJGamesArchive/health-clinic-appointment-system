import React, { useState } from "react";
import AddEntry from "./addLiftStyleEntry";
import accountData from "../../types/data/AccountData";
import { useAuthContext } from "../../contexts/AuthContext";
interface LifeStylePatientProps {
    accountData: accountData;
}

const LifeStylePatients: React.FC<LifeStylePatientProps> = ({accountData})=> {
    
   const auth = useAuthContext();
    const lifestyleData = accountData?.patientData?.lifeStyleHistory;
    const [showAddEntry, setShowAddEntry] = useState(false);
    

    const formatTitle = (str: string) =>
     str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

    const formatValue = (value: any) =>
    value instanceof Date
    ? new Date(value).toLocaleDateString()
    : typeof value === "string" && new Date(value).toString() !== "Invalid Date"
    ? new Date(value).toLocaleDateString()
    : value?.toString?.() || "N/A";



    if (!lifestyleData) return <p>No lifestyle information available.</p>;

    return (
        <div className="Main-Container">
    <div className="core-information">

      {Object.entries(lifestyleData).map(([category, entries]) => {
        if (!entries || entries.length === 0) return null;

        return (
          <div key={category} className="lifestyle-category">
            <h3>{formatTitle(category)}</h3>
            {entries.map((entry: any, index: number) => (
              <div key={index} className="lifestyle-entry">
                {Object.entries(entry).map(([field, value]) => (
                  <p key={field}>
                    <strong>{formatTitle(field)}:</strong> {formatValue(value)}
                  </p>
                ))}
                <hr />
              </div>
            ))}
          </div>
        );
      })}
      {auth.user?.role !== 'Patient' && (
                    <div className="info-item">
                        <button className="Add-Entry" onClick={() => setShowAddEntry(true)}>
                            Add Entry
                        </button>
                    </div>
                )}

                {showAddEntry && <AddEntry onClose={() => setShowAddEntry(false)} />}
            </div>
        </div>

);
};
export default LifeStylePatients;