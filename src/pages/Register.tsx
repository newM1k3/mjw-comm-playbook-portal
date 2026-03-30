import { useState } from 'react';
import { pb } from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: confirmPassword,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size={60} />
            <h1 className="text-3xl font-bold text-white mt-4">Account Created!</h1>
          </div>

          <div className="bg-[#111827] rounded-lg p-8 border border-[#00b4b4]">
            <div className="text-center space-y-4">
              <p className="text-[#00b4b4] text-lg font-medium">
                Check your email to confirm your account
              </p>
              <p className="text-gray-400 text-sm">
                We've sent a confirmation link to <span className="text-white">{email}</span>
              </p>
              <p className="text-gray-500 text-xs">
                After confirming your email, you can sign in to access the playbook.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full mt-6 py-3 bg-[#00b4b4] text-[#0a0a0a] rounded-lg font-semibold hover:bg-[#00d4d4] transition-colors"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size={60} />
          <h1 className="text-3xl font-bold text-white mt-4">Create Account</h1>
          <p className="text-gray-400 mt-2">Get started with the Communication Playbook</p>
        </div>

        <form onSubmit={handleRegister} className="bg-[#111827] rounded-lg p-8 border border-gray-800">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4b4] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4b4] transition-colors"
              placeholder="••••••••"
            />
            <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-300 mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4b4] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00b4b4] text-[#0a0a0a] rounded-lg font-semibold hover:bg-[#00d4d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#00b4b4] hover:text-[#00d4d4] transition-colors font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
