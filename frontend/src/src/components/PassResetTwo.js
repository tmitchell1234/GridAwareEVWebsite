import React, { useState, useEffect } from 'react';
import AuroraBackground from "./AuroraBackground";

function PassResetTwo() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [UserEmail, setUserEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Extract the email from the URL query string
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('UserEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        
        await fetch('https://gridawarecharging.com/api/reset_password_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                user_email: UserEmail,
                reset_code: parseInt(verificationCode, 10),
                new_password: newPassword
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Password reset successfully.");
                window.location.href = "/Login";
            } else {
                alert("Failed to reset password.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error resetting password.");
        });
    };

    return (
        <div>
            <AuroraBackground>
                <div className="resetPassTwoContainer">
                    <h1>Reset Password</h1>
                    <p>A verification code has been sent to {UserEmail}. Please enter the verification code below.</p>

                    <form onSubmit={handleSubmit}>
                        {/* <label>
                            Verification Code: */}
                            <input
                                type="number"
                                placeholder="Enter verification code"
                                className='verificationCodeField'
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        {/* </label> */}
                        
                        <input
                            type="password"
                            placeholder="New Password"
                            className='newPasswordField'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className='newPasswordField'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className='ResetPassWordTwoButton'>Submit</button>
                    </form>
                </div>
            </AuroraBackground>
        </div>
    );
}

export default PassResetTwo;