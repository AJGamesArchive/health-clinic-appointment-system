import React, { useState } from "react";
import "./CoreInfromationPatients.css"; 

const CoreInformationPatients: React.FC = () => {
    const [formData, setFormData] = useState({
        notes: "",
        title: "",
        age: "",
        dob: "",
        sexAtBirth: "",
        bloodType: "",
        gender: "",
        conditions: "",
        allergies: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="core-information">
            <div className="info-item">
                <p>Important Notes:</p>
                <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </div>
            <div className="info-item">
                <p>Title:</p>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Age:</p>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Date of Birth:</p>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Sex at Birth:</p>
                <input type="text" name="sexAtBirth" value={formData.sexAtBirth} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Blood Type:</p>
                <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Gender:</p>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Conditions:</p>
                <textarea name="conditions" value={formData.conditions} onChange={handleChange} />
            </div>
            <div className="info-item">
                <p>Allergies:</p>
                <textarea name="allergies" value={formData.allergies} onChange={handleChange} />
            </div>
        </div>
    );
};

export default CoreInformationPatients;