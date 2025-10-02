import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from './hooks/useAuth';
import { X } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, email, password, firstName, lastName);
      }
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-md">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Gradient top bar */}
          <div 
            className="h-2 w-full"
            style={{
              background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)'
            }}
          />

          {/* Header with animated icon */}
          <div className="relative pt-8 pb-6 px-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
                boxShadow: '0 8px 20px rgba(255, 65, 108, 0.35)'
              }}
            >
              <span className="text-white text-2xl">☆</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to FlashSale</h2>
            <p className="text-gray-600 text-sm">Join the hottest deals today!</p>
          </div>

          {/* Tab Navigation */}
          <div className="px-8">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => handleModeChange('login')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:scale-105'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleModeChange('signup')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:scale-105'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full transition-all duration-200 focus:scale-105"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full transition-all duration-200 focus:scale-105"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full transition-all duration-200 focus:scale-105"
                  required
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full transition-all duration-200 focus:scale-105"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full transition-all duration-200 focus:scale-105"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(90deg, #ff416c, #ff7aa2)',
                  boxShadow: '0 4px 12px rgba(255, 65, 108, 0.3)'
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Please wait...
                  </div>
                ) : (
                  mode === 'login' ? 'Login' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pb-12 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="#" className="text-red-500 hover:underline transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-red-500 hover:underline transition-colors">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


