"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Data Uploads & Integrations</CardTitle>
          <CardDescription>
            Import employee data via CSV/Excel or connect to your HRMS/LMS.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium">Import Employee Data</h3>
             <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="employee-data">Upload CSV/Excel File</Label>
                <div className="flex gap-2">
                    <Input id="employee-data" type="file" />
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                    </Button>
                </div>
            </div>
          </div>
          <div className="space-y-4">
             <h3 className="font-medium">HRMS/LMS Integration</h3>
             <p className="text-sm text-muted-foreground">
                Connect to your existing systems to automatically sync employee data. API keys and configuration may be required.
             </p>
             <Button variant="outline">Connect to HRMS</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
