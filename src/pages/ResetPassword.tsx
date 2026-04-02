/**
 * ResetPassword.tsx
 *
 * Handles the second half of the PocketBase password reset flow.
 *
 * Flow:
 *  1. User clicks "Forgot password?" on the Login page.
 *  2. Login page calls pb.collection('users').requestPasswordReset(email).
 *  3. PocketBase sends an email containing a link like:
 *       https://yourapp.com/reset-password?token=<TOKEN>
 *  4. User clicks the link → this component mounts.
 *  5. This component extracts the token from the URL, presents a new-password
 *     form, and calls pb.collection('users').confirmPasswordReset(token, pw, pw).
 *  6. On success, the user is redirected to /login with a success message.
 *
 * PocketBase Admin requirement:
 *   In PocketBase Admin → users collection → Options → "Password reset URL",
 *   set the value to:  https://yourapp.com/reset-password?token={TOKEN}
 *   (replace yourapp.com with your actual domain).
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import Logo from '../components/Logo';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // PocketBase appends the reset token as a `token` query parameter.
    const t = searchParams.get('token') ?? '';
    if (!t) {
      setError(
        'No reset token found in the URL. Please request a new password reset link.'
      );
    }
    setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token. Please request a new reset link.');
      return;
    }

    setLoading(true);
    try {
      // PocketBase v0.21 — confirmPasswordReset(token, newPassword, newPasswordConfirm)
      await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
      setSuccess(true);
    } catch (err: any) {
      // Surface PocketBase field-level errors if available.
      const pbData = err?.response?.data;
      if (pbData?.token?.message) {
        setError(
          'This reset link has expired or is invalid. Please request a new one.'
        );
      } else if (pbData?.password?.message) {
        setError(pbData.password.message);
      } else {
        setError(err.message || 'Failed to reset password. Please try again.');
      }
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
            <h1 className="text-3xl font-bold text-white mt-4">Password Updated</h1>
          </div>
          <div className="bg-[#111827] rounded-lg p-8 border border-[#00b4b4] text-center">
            <p className="text-[#00b4b4] mb-6">
              Your password has been successfully updated. You can now sign in
              with your new password.
            </p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="w-full py-3 bg-[#00b4b4] text-[#0a0a0a] rounded-lg font-semibold hover:bg-[#00d4d4] transition-colors"
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
          <h1 className="text-3xl font-bold text-white mt-4">Set New Password</h1>
          <p className="text-gray-400 mt-2">Enter your new password below</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] rounded-lg p-8 border border-gray-800"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Token missing — show a helpful message instead of the form */}
          {!token && !error && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded-lg text-yellow-400 text-sm">
              Loading reset token…
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-gray-300 mb-2 text-sm font-medium"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={!token}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4b4] transition-colors disabled:opacity-50"
              placeholder="At least 8 characters"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-300 mb-2 text-sm font-medium"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
              disabled={!token}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00b4b4] transition-colors disabled:opacity-50"
              placeholder="Repeat your new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 bg-[#00b4b4] text-[#0a0a0a] rounded-lg font-semibold hover:bg-[#00d4d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Updating Password…' : 'Update Password'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
