'use client';

import { useState } from 'react';
import { HealthDataTable } from '@/components/dashboard/health-data-table';
import { ReportUploader } from '@/components/dashboard/report-uploader';
import { TrendsChart } from '@/components/dashboard/trends-chart';
import { flagAbnormalValues, type FlagAbnormalValuesOutput } from '@/ai/flows/flag-abnormal-values';
import { getMockHealthData } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';

export default function DashboardPage() {
  const [healthData, setHealthData] = useState<FlagAbnormalValuesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReportUpload = async () => {
    setIsLoading(true);
    setHealthData(null);

    // Simulate file processing and data extraction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const extractedData = getMockHealthData();
      
      toast({
        title: 'Analysis in Progress',
        description: 'AI is analyzing your health data...',
      });

      const analyzedData = await flagAbnormalValues(extractedData);
      setHealthData(analyzedData);
      
      toast({
        title: 'Analysis Complete',
        description: 'Your health insights are ready.',
      });

    } catch (error) {
      console.error('Failed to analyze health data:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze health data. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
            <ReportUploader onUpload={handleReportUpload} isLoading={isLoading} />
            <TrendsChart />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <HealthDataTable data={healthData} isLoading={isLoading} />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center pb-[160px]">
          <SignIn routing="hash" afterSignOutUrl="/dashboard" />
        </div>
      </SignedOut>
    </>
  );
}
