import React, { useState } from 'react';

function PassResetOne (){
    const [UserEmail, setUserEmail] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(UserEmail);
        
        await fetch('https://gridawarecharging.com/api/reset_password_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                user_email: UserEmail
            })
        })
        .then(response => {
            // Check if the response is a success (status 200)
            if (response.ok) {
                // Redirecting to part two 
                window.location.href = "/PassResetTwo?UserEmail=" + encodeURIComponent(UserEmail);
            } else if (response.status === 400) {
                // Handle case when email is not found (status 400)
                alert("Email not found, please try again.");
            } else {
                // Handle other potential errors
                alert("An unexpected error occurred. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while trying to reset the password.");
        });
    }

    return (
        <div className='resetPasswordOneContainer'>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input 
                    type="email" 
                    placeholder="Enter associated email" 
                    className='resetPassEmailField'
                    required 
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button type="submit" className='EmailForResetPassWordButton'>Submit</button>
            </form>
        </div>
    );
}

export default PassResetOne;