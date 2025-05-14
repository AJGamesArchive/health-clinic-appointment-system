import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import CoreInformationPatients from "../components/tabs/CoreInfromationPatients";
import ContactInformationPatients from "../components/tabs/ContactInformationPatients";
import UpcomingAppointmentsPatients from "../components/tabs/UpcomingAppointmentsPatients";
import LifeStylePatients from "../components/tabs/LifeStylePatients";
import "./PatientProfile.css"; 

const PatientPage: React.FC = () => {
  
   const [activeTab, setActiveTab] = useState<string>("CoreInfromation");

    const renderTabContent = () => {
        switch (activeTab) {
            case "CoreInfromation":
                return <CoreInformationPatients />;
            case "ContactInformation":
               return <ContactInformationPatients />;
           case "LifeStyle":
               return <LifeStylePatients />;
            case "UpcomingAppointments":
               return <UpcomingAppointmentsPatients />;
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
                     <button
                        className={`tab ${activeTab === "UpcomingAppointments" ? "active" : ""}`}
                        onClick={() => handleClick("UpcomingAppointments")}
                        > Upcoming Appointments </button>
                    <button
                        className={`tab ${activeTab === "LifeStyle" ? "active" : ""}`}
                        onClick={() => handleClick("LifeStyle")}
                        > Life Style</button>
                </div>
        </div>
        {renderTabContent()}
    </Layout>
  );
};


export default PatientPage;