'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import { registerUser } from '@/actions/auth';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate password strength
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        setIsLoading(false);
        return;
      }

      // Call server action for registration
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        // Auto sign in after registration
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          // Registration succeeded but auto-login failed, redirect to login
          router.push('/login');
        } else if (signInResult?.ok) {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn('google', { redirect: true, callbackUrl: '/dashboard' });
    } catch (err) {
      setError('Google sign up failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="text-sm text-gray-600 mt-2">Join Kun and get started</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google OAuth Button */}
        <Button
          variant="outline"
          className="w-full h-10"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
        >
          <Chrome className="w-4 h-4 mr-2" />
          {isGoogleLoading ? 'Signing up...' : 'Continue with Google'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or sign up with email</span>
          </div>
        </div>

        {/* Name, Email, and Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Full name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-700"
            disabled={
              isLoading ||
              !formData.name ||
              !formData.email ||
              !formData.password
            }
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center border-t border-gray-200 py-4">
        <p className="text-sm text-gray-600 w-full">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
