import React, { useState } from 'react';
import loginIllustration from './../../assets/user_login.jpeg'; // Ensure path is correct

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('--- LOGIN START ---');
    console.log('Credentials:', { username, password });

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (response.ok) {
        // 1. Check if the token actually exists in the response
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token successfully stored in LocalStorage');
          console.log('Stored Token Preview:', data.token.substring(0, 10) + "...");
        } else {
          console.warn('Login succeeded but no Token was found in response body!');
        }

        // alert('Welcome Back!');
        window.location.href = '/gateway';
      } else {
        console.error('Login Failed with status:', response.status);
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Network Error during login:', error);
    }
  };

  return (
    // 1. FULL PAGE CONTAINER (With the light blue background)
    <div className="min-h-[80vh] flex items-center justify-center bg-[#e0f0fe] p-6">

      {/* 2. THE MAIN CARD (With rounded corners and shadow) */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

        {/* --- LEFT PANEL: ILLUSTRATION --- */}
        <div className="md:w-1/2 flex items-center justify-center p-12 bg-white">
          <img
            src={loginIllustration}
            alt="User Login Illustration"
            className="w-full h-auto object-contain scale-110" // Subtle scale for a snug fit
          />
        </div>

        {/* --- RIGHT PANEL: FORM --- */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-12 md:p-16 text-center bg-white">

          <h2 className="text-4xl font-serif text-[#1e4e8a] mb-2 font-medium">
            Welcome Back !!!
          </h2>

          <h3 className="text-2xl font-semibold text-[#8a5d21] mb-12">
            User Login
          </h3>

          <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">

            {/* --- User Name Input --- */}
            <div className="text-left">
              <label className="block text-sm font-medium text-[#1e4e8a] mb-1">
                User Name
              </label>
              <input
                type="text"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#e0e8f0] text-gray-800 rounded-xl focus:ring-2 focus:ring-[#1e4e8a]/50 outline-none transition-all placeholder:text-gray-500"
                required
              />
            </div>

            {/* --- Password Input --- */}
            <div className="text-left">
              <label className="block text-sm font-medium text-[#1e4e8a] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder='Enter the password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#e0e8f0] text-gray-800 rounded-xl focus:ring-2 focus:ring-[#1e4e8a]/50 outline-none transition-all"
                required
              />
            </div>
            {/* --- Login Button --- */}
            <div className="pt-6">
              <button
                type="submit"
                className={`w-full md:w-auto px-16 py-3 font-semibold rounded-xl transition-all duration-500 active:scale-95 shadow-md text-white
      ${username || password
                    ? "bg-[#22b978] hover:bg-[#1da36a] scale-105"
                    : "bg-[#69a18a]"
                  }`}
              >
                Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;