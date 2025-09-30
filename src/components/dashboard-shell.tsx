"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Repeat,
  Shield,
  User,
  Users,
  LineChart,
  Link,
  Upload,
  Briefcase,
  ListChecks,
  Network,
  ClipboardCheck,
} from 'lucide-react';
import Image from 'next/image';

import { useUser } from '@/contexts/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import EmployeeView from './views/employee-view';
import CommitteeView from './views/committee-view';
import AdminView from './views/admin-view';
import { Skeleton } from './ui/skeleton';
import { allUsers, notifications } from '@/lib/data';
import { ChatAssistant } from './chat-assistant';

const roleIcons = {
  employee: <User className="mr-2 h-4 w-4" />,
  committee: <Users className="mr-2 h-4 w-4" />,
  admin: <Shield className="mr-2 h-4 w-4" />,
};

export function DashboardShell() {
  const router = useRouter();
  const { user, logout, switchRole } = useUser();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    if (!localStorage.getItem('ascendify-user')) {
      router.push('/login');
    }
  }, [router]);
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isClient || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (user.role) {
      case 'employee':
        return <EmployeeView />;
      case 'committee':
        return <CommitteeView />;
      case 'admin':
        return <AdminView />;
      default:
        return <EmployeeView />;
    }
  };

  const pageTitle = {
    employee: 'My Dashboard',
    committee: 'Committee View',
    admin: 'Admin Console',
  }[user.role];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <svg
                className="size-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 8.5V15.5L12 22L22 15.5V8.5L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 8.5L12 12L2 8.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
             </svg>
            <span className="text-lg font-semibold">Ascendify</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutGrid />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user.role === 'employee' && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/development-plan')}>
                    <ListChecks />
                    Development Plan
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/learning-path')}>
                    <Network />
                    Learning Path
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/self-assessment')}>
                    <ClipboardCheck />
                    Self-Assessment
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}

            {(user.role === 'admin' || user.role === 'committee') && (
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/critical-roles')}>
                  <Briefcase />
                  Critical Roles
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
             {(user.role === 'admin' || user.role === 'committee') && (
              <>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/analytics')}>
                    <LineChart />
                    Analytics
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/mentor-matching')}>
                    <Users />
                    Mentor Matching
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
            {user.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/integrations')}>
                    <Upload />
                    Integrations
                  </SidebarMenuButton>
                </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map(n => (
                  <DropdownMenuItem key={n.id} className="flex-col items-start gap-1 whitespace-normal">
                    <p>{n.text}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user.name}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Repeat className="mr-2 h-4 w-4" />
                      <span>Switch Role</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {allUsers.map((u) => (
                          <DropdownMenuItem key={u.id} onClick={() => switchRole(u.role)} disabled={u.role === user.role}>
                            {roleIcons[u.role]}
                            <span>{u.name} ({u.role})</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
          <ChatAssistant />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
