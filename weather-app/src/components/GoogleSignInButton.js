import React from 'react';

const GoogleSignInButton = ({ onSignIn }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
      <p>Sign in with your Google Account to access user features.</p>
      <button onClick={onSignIn}>
        Sign In with Google (Placeholder)
      </button>
    </div>
  );
};

export default GoogleSignInButton;
