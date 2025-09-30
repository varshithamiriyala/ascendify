
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { allUsers, employeeProfiles } from "@/lib/data";
import { Button } from "@/components/ui/button";

const criticalRoles = [
    { id: 'cr1', title: 'Senior Software Engineer', successors: 1, readyNow: 0, ready1Year: 1, ready2Years: 0 },
    { id: 'cr2', title: 'Senior Product Manager', successors: 1, readyNow: 0, ready1Year: 1, ready2Years: 0 },
    { id: 'cr3', title: 'Director of Engineering', successors: 0, readyNow: 0, ready1Year: 0, ready2Years: 0 },
];


export default function CriticalRolesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Successor Pipeline View</CardTitle>
          <CardDescription>
            Org-level view of how many successors are available for each critical role.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Critical Role</TableHead>
                <TableHead className="text-center">Successors</TableHead>
                <TableHead className="text-center">Ready Now</TableHead>
                <TableHead className="text-center">Ready in 1 Year</TableHead>
                <TableHead className="text-center">Ready in 2+ Years</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.title}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{role.successors}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={role.readyNow > 0 ? "default" : "secondary"}>{role.readyNow}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={role.ready1Year > 0 ? "default" : "secondary"}>{role.ready1Year}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={role.ready2Years > 0 ? "default" : "secondary"}>{role.ready2Years}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Pipeline</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
