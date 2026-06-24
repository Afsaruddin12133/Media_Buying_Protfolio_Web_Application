import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // Firebase automatically manages the user session, so we don't need a token in localStorage
      // But we can store a flag if we want, or just rely on Firebase's onAuthStateChanged in Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brandBg px-6">
      <div className="w-full max-w-md bg-white border border-black/10 p-8 shadow-[8px_8px_0px_var(--color-brandAccent)]">
        <h2 className="text-3xl font-display font-black text-center mb-6 uppercase tracking-tighter">Admin Login</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none transition-colors"
              required 
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-brandAccent text-white font-bold uppercase tracking-widest text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000] transition-all border border-brandAccent hover:bg-transparent hover:text-brandAccent disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
