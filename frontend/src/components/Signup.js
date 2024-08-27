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

    return (
        <div>
            <h2 className="registrationPage">Register</h2>
            <div className="registrationPageForm">
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input type="text" value={firstname} onChange={handleFirstNameChange} />
                    <br />
                    <label>Last Name:</label>
                    <input type="text" value={lastname} onChange={handleLastNameChange} />
                    <br />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} required />
                    <br />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                    <br />
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    <br />
                    <label>Account Type:</label>
                    <div>
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
                    {userType === "organization" && (
                        <div>
                            <label>Organization Name:</label>
                            <input type="text" value={organization} onChange={handleOrganizationChange} required />
                        </div>
                    )}
                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;