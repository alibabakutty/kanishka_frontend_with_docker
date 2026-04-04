import React, { useEffect, useState } from 'react';
import loginIllustration from './../../assets/user_login.jpeg'; // Ensure path is correct
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // This checks if the URL has ?token=... (sent by your Spring Boot redirect)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error'); 

    if (token) {
      localStorage.setItem('token', token);
      console.log('OAuth2 Login Successful');
      window.location.href = '/gateway'; // Redirect to dashboard
    } else if (error) {
      console.error("Login Error:", error);
      alert("Google Login failed. Please try again.");
    }
  }, [location, navigate]);

  // --- 2. START GOOGLE LOGIN ---
  const handleGoogleLogin = () => {
    // Direct browser to Spring Boot's OAuth2 entry point
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

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
    <div className="min-h-screen flex items-center justify-center bg-[#e0f0fe] p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

        {/* LEFT PANEL */}
        <div className="md:w-1/2 flex items-center justify-center p-12 bg-white">
          <img src={loginIllustration} alt="Login" className="w-full h-auto object-contain scale-110" />
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-12 md:p-16 text-center bg-white">
          <h2 className="text-4xl font-serif text-[#1e4e8a] mb-2 font-medium">Welcome Back !!!</h2>
          <h3 className="text-2xl font-semibold text-[#8a5d21] mb-8">User Login</h3>

          {/* --- GOOGLE LOGIN BUTTON --- */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full max-w-sm mb-6 flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* OR DIVIDER */}
          <div className="flex items-center w-full max-w-sm mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* MANUAL LOGIN FORM */}
          <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
            <div className="text-left">
              <label className="block text-sm font-medium text-[#1e4e8a] mb-1">User Name</label>
              <input
                type="text"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#e0e8f0] text-gray-800 rounded-xl focus:ring-2 focus:ring-[#1e4e8a]/50 outline-none transition-all"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-[#1e4e8a] mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#e0e8f0] text-gray-800 rounded-xl focus:ring-2 focus:ring-[#1e4e8a]/50 outline-none transition-all"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full px-16 py-3 font-semibold rounded-xl transition-all duration-500 active:scale-95 shadow-md text-white
                  ${username || password ? "bg-[#22b978] hover:bg-[#1da36a] scale-105" : "bg-[#69a18a]"}`}
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