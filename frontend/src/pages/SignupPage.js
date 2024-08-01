import React, { useState } from "react";

function SignupPage() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log("Registration form submitted");
        console.log("First Name:", firstname);
        console.log("Last Name:", lastname);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
    };

    return (
        <div>
            <h2 className="registrationPage">Register</h2>
            <div className="registrationPageForm">
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" value={firstname} onChange={handleFirstNameChange} required />
                <br />
                <label>Last Name:</label>
                <input type="text" value={lastname} onChange={handleLastNameChange} required />
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
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    );
}

export default SignupPage;