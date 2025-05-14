import React, { useState } from "react";
import "./CoreInfromationPatients.css"; 

type PatientRole = "Patient" | "Doctor" | "Admin";

interface PatientFormData {
    notes: string[];
    title: string;
    forname: string;
    surname: string;
    role: PatientRole;
    age: string;
    dob: string;
    sexAtBirth: string;
    bloodType: string;
    gender: string;
    conditions: string[];
    allergies: string[];
}



const CoreInformationPatients: React.FC = () => {
    const [formData, setFormData] = useState({
        notes: ["weekly checkup", "no allergies"],
        title: "",
        age: "",
        dob: "",
        sexAtBirth: "",
        bloodType: "",
        gender: "",
        conditions: [],
        allergies: [],
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
                 value={formData.notes.join(", \n ")} 
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
                 value={formData.dob}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.dob)}
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