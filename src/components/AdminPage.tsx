import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHackathonStore } from '../store/hackathonStore';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated, setEndDate, logout } = useHackathonStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value).toISOString());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-xl w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <Lock className="w-12 h-12 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 rounded-lg bg-white/5 border border-purple-500/20 focus:border-purple-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Hackathon Settings</h2>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Set Hackathon End Date</h3>
          <input
            type="datetime-local"
            onChange={handleDateChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-purple-500/20 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );
}