import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import CoreInformationPatients from "../components/tabs/CoreInfromationPatients";
import ContactInformationPatients from "../components/tabs/ContactInformationPatients";
import UpcomingAppointmentsPatients from "../components/tabs/UpcomingAppointmentsPatients";
import LifeStylePatients from "../components/tabs/LifeStylePatients";
import { useAuthContext } from "../contexts/AuthContext";
import { UseRouteAuthHook } from "../hooks/security/UseRouteAuth";
import { useAccountProfile } from "../hooks/UseProfileHook";
import "./PatientProfile.css"; 
import { useParams } from "react-router-dom";



const PatientPage: React.FC = () => {
    const { id } = useParams();
    const { data: accountData, loading } = id 
    ? useAccountProfile(id, "patient") 
    : useAccountProfile();

  
   const [activeTab, setActiveTab] = useState<string>("CoreInfromation");

    const renderTabContent = () => {
        if (!accountData) return null;


        switch (activeTab) {
            case "CoreInfromation":
                return <CoreInformationPatients accountData={accountData} />;
            case "ContactInformation":
               return <ContactInformationPatients accountData={accountData} />;
           case "LifeStyle":
               return <LifeStylePatients accountData={accountData} />;
            case "UpcomingAppointments":
               return <UpcomingAppointmentsPatients accountData={accountData}/>;
            //case "MedicalHistory":
               //return <MedicalHistoryPatients />;
        }
    };

    const handleClick = (tabName: string): void => {
    setActiveTab(tabName);
};

  // JSX
  return (
    <Layout>
        <div className="patient-Profile-container">
            <h1>{accountData?.forenames} {accountData?.surname} </h1> 
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
        {loading && <p>Loading...</p>}
        
        {renderTabContent()}
    </Layout>
  );
};


export default PatientPage;