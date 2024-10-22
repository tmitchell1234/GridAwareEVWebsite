import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const UserToken = localStorage.getItem('jwt');

    // Parse and Decode JWT from cookie
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    
    const decodedUserToken = parseJwt(UserToken);

    //to re-encode the updated token when user updates their profile
    function encodeJwt(payload) {
        const base64Url = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return `${base64Url}`;
    }

    // to re-encode the updated token with old signature and header 
    function updateJwtWithOldHeaderAndSignature(oldToken, newPayload) {
        // Split the old token into its parts
        const [headerB64, , signatureB64] = oldToken.split('.');
        // Encode the new payload
        const newPayloadB64 = encodeJwt(newPayload);
        // Create the new token with the old header and signature
        return `${headerB64}.${newPayloadB64}.${signatureB64}`; 
    }

    // Current admin profile states
    const [AdminFirstName, setAdminFirstName] = useState(decodedUserToken.user_first_name);
    const [AdminLastName, setAdminLastName] = useState(decodedUserToken.user_last_name);
    const [AdminOrganization, setAdminOrganization] = useState(decodedUserToken.user_organization);
    const [AdminPassword, setAdminPassword] = useState("**********");

    //AdminOrganization is null when user organization is empty
    

    // New admin profile states for when updating the profile
    const [NewAdminFirstName, setNewAdminFirstName] = useState(decodedUserToken.user_first_name);
    const [NewAdminLastName, setNewAdminLastName] = useState(decodedUserToken.user_last_name);
    const [NewAdminOrganization, setNewAdminOrganization] = useState(AdminOrganization);
    const [NewAdminPassword, setNewAdminPassword] = useState("**********");

    const [ProfileUpdatesSuccessfully, setProfileUpdatesSuccessfully] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update first name if changed
        if (NewAdminFirstName !== AdminFirstName) {
            await fetch('https://gridawarecharging.com/api/update_user_first_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: apiKey,
                    user_jwt: UserToken,
                    new_name: NewAdminFirstName
                })
            }).then(response => response.json())
            .then(data => {
                const updatedToken = data.token; // Store the token in updatedToken
                localStorage.setItem('jwt', updatedToken);
                setProfileUpdatesSuccessfully(true);
                alert('Profile updated successfully!');
            })
            .catch(error => console.error('Error updating first name:', error));
        }

        // Update last name if changed
        if (NewAdminLastName !== AdminLastName) {
            await fetch('https://gridawarecharging.com/api/update_user_last_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: apiKey,
                    user_jwt: UserToken,
                    new_name: NewAdminLastName
                })
            }).then(response => response.json())
            .then(data => {
                const updatedToken = data.token; // Store the token in updatedToken
                localStorage.setItem('jwt', updatedToken);
                setProfileUpdatesSuccessfully(true);
                alert('Profile updated successfully!');
            })
            .catch(error => console.error('Error updating last name:', error));
        }

        // Update organization if changed
        if (NewAdminOrganization !== AdminOrganization) {
            await fetch('https://gridawarecharging.com/api/update_user_organization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: apiKey,
                    user_jwt: UserToken,
                    new_organization: NewAdminOrganization
                })
            }).then(response => response.json())
            .then(data => {
                const updatedToken = data.token; // Store the token in updatedToken
                localStorage.setItem('jwt', updatedToken);
                setProfileUpdatesSuccessfully(true);
                alert('Profile updated successfully!');
            })
            .catch(error => console.error('Error updating Organization:', error));
        }

        // Update password if changed
        if (NewAdminPassword !== AdminPassword) {
            await fetch('https://gridawarecharging.com/api/update_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: apiKey,
                    user_jwt: UserToken,
                    new_password: NewAdminPassword
                })
            }).then(response => response.json())
            .then(setProfileUpdatesSuccessfully(true))
            .then(alert('Profile updated successfully!'))
              .catch(error => console.error('Error updating password:', error));
        }

        

        if(ProfileUpdatesSuccessfully === true){
            console.log('Updated profile submitted:', {
                firstName: NewAdminFirstName,
                lastName: NewAdminLastName,
                organization: NewAdminOrganization,
                password: NewAdminPassword
            });
            
            // const oldToken = UserToken;

            // decodedUserToken.user_first_name = NewAdminFirstName;
            // decodedUserToken.user_last_name = NewAdminLastName;
            // if (NewAdminOrganization !== AdminOrganization) {
            //     decodedUserToken.user_organization = NewAdminOrganization;
            // }

            // // Re-encode the modified token
            // // const updatedToken = encodeJwt(decodedUserToken); 
            // const updatedToken = updateJwtWithOldHeaderAndSignature(oldToken, decodedUserToken);
            // // storing the new cookie in storage 
            // localStorage.setItem('jwt', updatedToken);
            setProfileUpdatesSuccessfully(false)
            // alert('Profile updated successfully!');
            // window.location.reload();
        }
    };

    const handleDeleteAccount = async (e) => {
        // Show a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    
        if (isConfirmed) {
            await fetch('https://gridawarecharging.com/api/delete_user_account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_key: apiKey,
                        user_jwt: UserToken
                    })
                })
                .then(response => {
                    if (response.ok) {
                        alert("Account Deleted Successfully.");
                        window.location.href = "/";
                    } else {
                        alert("Failed to delete account, please try again later.");
                    }
                });
        }
    }

    return (
        <div className="usernameProfileContainer">
            <button type="submit" className='DeleteAdminAccountButton' onClick={handleDeleteAccount}>Delete Account</button> {/* Delete account - TO DO LATER; Remove devices from user or remove user access from device before deleting account */}
            <form onSubmit={handleSubmit}>
                <div className="inputForAdminProfile">
                    
                    <label htmlFor="Name">Name</label>
                    <br />
                    <input
                        type="text"
                        className='adminProfileInputFirstName'
                        value={NewAdminFirstName}
                        onChange={(e) => setNewAdminFirstName(e.target.value)} // Update the first name on change
                    />
                    <input
                        type="text"
                        className='adminProfileInputLastName'
                        value={NewAdminLastName}
                        onChange={(e) => setNewAdminLastName(e.target.value)} // Update the last name on change
                    />
                    <br />
                    <label htmlFor="OrganizationName">Organization</label>
                    <br />
                    <input
                        type="text"
                        className='adminProfileInputOrganizationName'
                        value={NewAdminOrganization ?? 'none'}
                        onChange={(e) => setNewAdminOrganization(e.target.value)} // Update the organization on change
                    />
                    <br />
                    <label htmlFor="PasswordChange">Password</label>
                    <br />
                    <input
                        type="password"
                        className='adminProfilePasswordChange'
                        value={NewAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)} // Update the Password on change
                    />
                    
                </div>
                <button type="submit" className='submitAdminProfileChangeButton'>Submit</button>
            </form>
        </div>
    );
};

export default AdminProfile;