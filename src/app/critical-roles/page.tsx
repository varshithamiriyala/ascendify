
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
            Org-level view of how many successors are available for each critical role. Roles with no ready-now successors are highlighted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
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
                {criticalRoles.map((role) => {
                  const isAtRisk = role.readyNow === 0;
                  return (
                    <TableRow key={role.id} className={isAtRisk ? "bg-amber-50 dark:bg-amber-950/50" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {isAtRisk && (
                             <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This role has no successors ready now.</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <span>{role.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={role.successors > 0 ? "outline" : "secondary"}>{role.successors}</Badge>
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
                  )
                })}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}

