import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = () => {
        console.log("Handling signup");

        if (password !== passwordConfirmation) {
            setErrorMessage('Password and password confirmation do not match');
            return;
        }

        fetch('https://friendly-cod-7vgj9vq9wqgcr7j5-3001.app.github.dev/api/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log('The data: ', {data});
                const jwt_token = data.data;
                localStorage.setItem('auth_token', jwt_token);
                navigate('/');
            })
            .catch((err) => {
                console.log('The error: ', { err });
                setErrorMessage("Internal Server Error");
            })
    }

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <h2>Signup</h2>

            <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                }}>
                <label>
                    Email:
                </label>
                <input
                    style={{ borderRadius: '5px' }}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>
                    Pasword:
                </label>
                <input
                    style={{ borderRadius: '5px' }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                    Password Confirmation:
                </label>
                <input
                    style={{ borderRadius: '5px' }}
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    style={{
                        marginTop: '1rem',
                        borderRadius: '5px'
                    }}
                >
                    Signup
                </button>

                {!!errorMessage && (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <p
                            style={{ color: 'red', marginTop: '1rem' }}
                        >
                            {errorMessage}
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}