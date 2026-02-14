'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await requestPasswordReset(email);

      if (result.error) {
        setError(result.error);
      } else {
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pt-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-gray-600 mb-2">
            We've sent a password reset link to your email address.
          </p>
          <p className="text-sm text-gray-500">
            Click the link in the email to reset your password. The link expires in 1 hour.
          </p>
        </CardContent>

        <CardFooter className="text-center border-t border-gray-200 py-4">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="text-sm text-gray-600 mt-2">
          Enter your email address and we'll send you a reset link
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 mt-6"
            disabled={isLoading || !email}
          >
            {isLoading ? 'Sending reset link...' : 'Send reset link'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center border-t border-gray-200 py-4">
        <Link
          href="/login"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
