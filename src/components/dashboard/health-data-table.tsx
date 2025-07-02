'use client';

import { type FlagAbnormalValuesOutput } from "@/ai/flows/flag-abnormal-values";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, FileText } from "lucide-react";

interface HealthDataTableProps {
  data: FlagAbnormalValuesOutput | null;
  isLoading: boolean;
}

export function HealthDataTable({ data, isLoading }: HealthDataTableProps) {
  const renderSkeletons = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Data Analysis</CardTitle>
        <CardDescription>
          Your extracted health parameters are listed below with AI-powered insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Normal Range</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? renderSkeletons() : (
                data && data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.value} {item.unit}</TableCell>
                      <TableCell>{item.normalRange}</TableCell>
                      <TableCell>
                        {item.needsAttention ? (
                          <Badge className="badge-attention">
                            <AlertCircle className="mr-1 h-3.5 w-3.5" />
                            Needs Attention
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Normal</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      No data to display. Upload a report to get started.
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
