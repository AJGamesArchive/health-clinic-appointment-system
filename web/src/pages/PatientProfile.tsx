import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import CoreInformationPatients from "../components/tabs/CoreInfromationPatients";
import ContactInformationPatients from "../components/tabs/ContactInformationPatients";
import "./PatientProfile.css"; 

const PatientPage: React.FC = () => {
  
   const [activeTab, setActiveTab] = useState<string>("CoreInfromation");

    const renderTabContent = () => {
        switch (activeTab) {
            case "CoreInfromation":
                return <CoreInformationPatients />;
            case "ContactInformation":
               return <ContactInformationPatients />;
           // case "MedicalHistory":
               // return <MedicalHistoryPatients />;
           // case "PreviousAppointments":
               // return <PreviousAppointmentsPatients />;
        }
    };

    const handleClick = (tabName: string): void => {
    setActiveTab(tabName);
};

  // JSX
  return (
    <Layout>
        <div className="patient-Profile-container">
            <h1>Patient Name</h1> <h2>Patient</h2>
                <div className="tabs-section">
                    <button
                        className={`tab ${activeTab === "CoreInfromation" ? "active" : ""}`}
                        onClick={() => handleClick("CoreInfromation")}
                        > Core Information </button>
                    <button
                        className={`tab ${activeTab === "ContactInformation" ? "active" : ""}`}
                        onClick={() => handleClick("ContactInformation")}
                        > Contact Information </button>
                </div>
        </div>
        {renderTabContent()}
    </Layout>
  );
};


export default PatientPage;