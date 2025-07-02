'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud } from 'lucide-react';

interface ReportUploaderProps {
  onUpload: () => void;
  isLoading: boolean;
}

export function ReportUploader({ onUpload, isLoading }: ReportUploaderProps) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Report</CardTitle>
        <CardDescription>Upload a PDF or image of your health report to begin analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="report-file" className="sr-only">Health Report</Label>
          <Input id="report-file" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} disabled={isLoading} />
        </div>
        {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
        <Button onClick={onUpload} disabled={isLoading || !fileName} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 h-4 w-4" />
              Analyze Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
