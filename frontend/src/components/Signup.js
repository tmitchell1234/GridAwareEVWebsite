import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("customer");
    const [organization, setOrganization] = useState("");
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        if (e.target.value === "customer") {
            setOrganization("");
        }
    };

    const handleOrganizationChange = (e) => {
        setOrganization(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_type: userType,
            user_email: email,
            user_password: password,
            user_first_name: firstname || null,
            user_last_name: lastname || null,
            user_organization: userType === "organization" ? organization : null,
        };

        try {
            const response = await fetch("http://gridawarecharging.com/api/user_create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            navigate('/CustomerDashboardPage');
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed, please try again.");
        }
    };

    const handleCancel = () => {
        navigate('/');
      };

    return (
        <div className="register-container">
            <h2 className="registerTitle">Register</h2>
            <br />
            <div className="register-page">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" id="firstname" value={firstname} onChange={handleFirstNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" id="lastname" value={lastname} onChange={handleLastNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    </div>
                    <div className="form-group">
                        <label>Account Type:</label>
                        <div className="user-type-options">
                            <label>
                                <input
                                    type="radio"
                                    value="customer"
                                    checked={userType === "customer"}
                                    onChange={handleUserTypeChange}
                                />
                                Customer
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="organization"
                                    checked={userType === "organization"}
                                    onChange={handleUserTypeChange}
                                />
                                Organization
                            </label>
                        </div>
                    </div>
                    {userType === "organization" && (
                        <div className="form-group">
                            <label htmlFor="organization">Organization Name:</label>
                            <input type="text" id="organization" value={organization} onChange={handleOrganizationChange} required />
                        </div>
                    )}
                    <button className="registersubmitbutton" type="submit">Register</button>
                    <button className="cancelregistrationbutton" type="button" onClick={handleCancel}> Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;