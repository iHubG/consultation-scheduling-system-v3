import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import useCan from '@/hooks/useCan';

// Extend NavItem with permission and role
type PermissionNavItem = NavItem & {
    permissions: string;
    roles?: string;
};

export function NavMain({ items = [] }: { items: PermissionNavItem[] }) {
    const page = usePage();
    const { can, hasRole } = useCan();

    const visibleItems = items.filter(item => {
        if (item.permissions && !can(item.permissions)) return false;
        if (item.roles && !hasRole(item.roles)) return false;
        return true;
    });

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
