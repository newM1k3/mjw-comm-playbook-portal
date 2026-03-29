import { useState } from 'react';
import Logo from './Logo';

interface LoginScreenProps {
  onLogin: (password: string) => boolean;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Access denied. Please check your password.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a202c] p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={80} />
          <h1 className="text-2xl md:text-3xl font-bold text-[#e2e8f0] text-center mt-6 mb-2">
            The Communication Playbook
          </h1>
          <p className="text-[#a0aec0] text-lg">Member Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your access password"
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-colors"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors"
          >
            Enter Portal
          </button>
        </form>
      </div>
    </div>
  );
}
