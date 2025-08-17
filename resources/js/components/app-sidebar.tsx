import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useCan from '@/hooks/useCan';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Shield, User, Settings, Clock, ClipboardList } from 'lucide-react';
import AppLogo from './app-logo';

type PermissionNavItem = NavItem & {
    permissions?: string;
    roles?: string;
};

export function AppSidebar() {
    const { can, hasRole } = useCan();

    const mainNavItems: PermissionNavItem[] = [
        // Common for all
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },

        // Admin only
        {
            title: 'Manage Users',
            href: '/users',
            icon: User,
            roles: 'admin',
        },
        {
            title: 'Roles & Permissions',
            href: '/roles-permissions',
            icon: Shield,
            roles: 'admin',
        },
        {
            title: 'System Settings',
            href: '/admin',
            icon: Settings,
            roles: 'admin',
        },
        {
            title: 'All Consultations',
            href: '/consultations',
            icon: ClipboardList,
            roles: 'admin',
        },

        // Faculty only
        {
            title: 'My Consultations',
            href: '/faculty/consultations',
            icon: ClipboardList,
            roles: 'faculty',
        },

        // Student only
        {
            title: 'Request Consultation',
            href: '/student/request',
            icon: ClipboardList,
            roles: 'student',
        },
        {
            title: 'My Appointments',
            href: '/student/appointments',
            icon: Clock,
            roles: 'student',
        },
        {
            title: 'Faculty Directory',
            href: '/faculty',
            icon: User,
            roles: 'student',
        },
    ];

    const footerNavItems: NavItem[] = [];

    const filteredMainNav = mainNavItems.filter((item) => {
        if (item.permissions && !can(item.permissions)) return false;
        if (item.roles && !hasRole(item.roles)) return false;
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNav} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
