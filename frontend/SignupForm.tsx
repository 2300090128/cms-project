import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return email.endsWith("@kluniversity.in");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email domain. Please use a '@kluniversity.in' email.");
      return;
    }
    setError("");
    console.log("Signup Attempt:", { email, password });
    // API integration would go here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email-signup" className="block text-sm font-medium text-gray-300">
          KL University Email
        </label>
        <input
          type="email"
          id="email-signup"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password-signup" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          id="password-signup"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          required
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;