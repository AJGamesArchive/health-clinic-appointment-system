import React, { useState } from "react";

interface ContactInformationForm{
    personalPhone:string;
    personalEmail:string;
    address:string;
    emergencyContactPhone:string;
    emergencyContactRelation:string;
}

const ContactInformation: React.FC = () => {
const [formData, setFormData] = useState({
        personalPhone: "",
        personalEmail: "",
        address: "",
        emergencyContactPhone: "",
        emergencyContactRelation: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isReadOnly = (value: string) => value !== "";

    return (
        <div className="core-information">
            <strong>Contact Information</strong>
            <div className="info-item">
                <p>Personal Phone:</p>
                <input
                 type="text"
                 name="personalPhone"
                 value={formData.personalPhone}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.personalPhone)} 
                 />
            </div>
            <div className="info-item">
                <p>Personal Email:</p>
                <input
                 type="text"
                 name="personalEmail"
                 value={formData.personalEmail}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.personalEmail)}
                 />
            </div>
            <div className="info-item">
                <p>Address:</p>
                <textarea
                 name="address"
                 value={formData.address}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.address)}
                 />
            </div>
            <strong>Emergency Contact Information</strong>
            <div className="info-item">
                <p>Emergency Contact Phone</p>
                <input
                 type="number"
                 name="emergencyContactPhone"
                 value={formData.emergencyContactPhone}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.emergencyContactPhone)}
                 />
            </div>
            <div className="info-item">
                <p>Emergency Contact Relationship:</p>
                <input
                 type="text"
                 name="emergencyContactRelation"
                 value={formData.emergencyContactRelation}
                 onChange={handleChange}
                 readOnly={isReadOnly(formData.emergencyContactRelation)}
                 />
            </div>
            
        </div>
    );
};
export default ContactInformation;