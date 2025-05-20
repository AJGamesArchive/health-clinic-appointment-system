import React, { useState } from "react";
import "./CoreInfromationPatients.css"; 
import accountData from "../../types/data/AccountData";
import DebugBlock from "../utilities/DebugBlock";

interface CoreInformationPatientsProps {
  accountData: accountData;
}

const CoreInformationPatients: React.FC<CoreInformationPatientsProps> = ({ accountData }) => {

    const calculateAge = (dob: string): string => {
        if (!dob) return "";

        const birthDate = new Date(dob)
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getDate();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0 )){
            age--;
        }
        return age.toString();
    }



    const [formData, setFormData] = useState({
        notes: accountData.patientData?.importantNotes || [],
        title: accountData.title || "",
        age: calculateAge(accountData.patientData?.dateOfBirth.toString() || ""),
        dob: accountData.patientData?.dateOfBirth || "", //! Will always be returned as an ISO string from API
        sexAtBirth: accountData.patientData?.medicalInformation.sexAtBirth || "",
        bloodType: accountData.patientData?.medicalInformation.bloodType || "",
        gender: accountData.patientData?.gender || "",
        conditions: accountData.patientData?.medicalInformation.conditions || [],
        allergies: accountData.patientData?.medicalInformation.allergies || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isReadOnly = (value: string | string[]) => {
        return Array.isArray(value) ? value.length > 0 : value !== "";
    };

    return (
        <div className="core-information">
            <div className="info-item">
                <p>Important Notes:</p>
                <textarea
                 name="notes" 
                 value={formData.notes.join(", \n")} 
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.notes)}
                />
            </div>
            <div className="info-item">
                <p>Title:</p>
                <input
                 type="text" 
                 name="title" 
                 value={formData.title} 
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.title)} 
                 />
            </div>
            <div className="info-item">
                <p>Age:</p>
                <input
                 type="number"
                 name="age" 
                 value={formData.age}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.age)}
                 />
            </div>
            <div className="info-item">
                <p>Date of Birth:</p>
                <input
                 type="date"
                 name="dob"
                 value={(formData.dob as string).split('T')[0]}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.dob.toString())}
                />
            </div>
            <div className="info-item">
                <p>Sex at Birth:</p>
                <input
                 type="text"
                 name="sexAtBirth"
                 value={formData.sexAtBirth}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.sexAtBirth)}
                 />
            </div>
            <div className="info-item">
                <p>Blood Type:</p>
                <input
                 type="text"
                 name="bloodType"
                 value={formData.bloodType}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.bloodType)}
                 />
            </div>
            <div className="info-item">
                <p>Gender:</p>
                <input
                 type="text"
                 name="gender"
                 value={formData.gender}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.gender)}
                 />
            </div>
            <div className="info-item">
                <p>Conditions:</p>
                <textarea
                 name="conditions"
                 value={formData.conditions.join(", ")}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.conditions)}
                 />
            </div>
            <div className="info-item">
                <p>Allergies:</p>
                <textarea
                 name="allergies"
                 value={formData.allergies.join(", ")}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.allergies)} />
            </div>
        </div>
    );
};

export default CoreInformationPatients;