import { LoginForm } from '@/components/auth/login-form';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center space-y-4 mb-8 text-center">
        <div className="bg-primary/10 p-4 rounded-full">
            <Leaf className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary">Health Insights Analyzer</h1>
        <p className="text-muted-foreground max-w-sm">Log in to upload your health reports and get AI-powered insights.</p>
      </div>
      <LoginForm />
    </main>
  );
}
