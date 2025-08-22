import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

interface Notification {
  id: number;
  title: string;
  description?: string;
  time: string;
}

export function Notification() {
  const { auth } = usePage<SharedData>().props;
  const roles = Array.isArray(auth.user.roles) ? auth.user.roles : [auth.user.roles];

  const getNotificationsForRoles = (roles: string[]): Notification[] => {
    const allNotifications: Notification[] = [];

    roles.forEach((role) => {
      switch (role) {
        case 'admin':
          allNotifications.push(
            { id: 1, title: 'New user registered', description: 'Student: John Doe', time: '5m ago' }
          );
          break;
        case 'faculty':
          allNotifications.push(
            { id: 2, title: 'New consultation request', description: 'From: Jane Doe', time: '30m ago' }
          );
          break;
        case 'student':
          allNotifications.push(
            { id: 3, title: 'Consultation approved', description: 'Prof. Smith approved your request', time: '1h ago' }
          );
          break;
      }
    });

    return allNotifications;
  };

  const notifications = getNotificationsForRoles(roles);
  const count = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {count > 0 && (
            <span
              className="absolute top-3 right-3 inline-flex items-center justify-center
              text-xss py-[3px] px-[6px] font-bold leading-none text-white bg-red-600 rounded-full
              transform translate-x-1/2 -translate-y-1/2"
            >
              {count}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-auto p-3">
        <DropdownMenuLabel className="text-xl mb-1">Notifications</DropdownMenuLabel>
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          <>
            {notifications.map(({ id, title, description, time }) => (
              <DropdownMenuItem
                key={id}
                className="flex flex-col items-start gap-1 cursor-pointer"
              >
                <span className="font-medium">{title}</span>
                {description && <span className="text-sm text-muted-foreground">{description}</span>}
                <span className="text-xs text-muted-foreground">{time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-indigo-600 cursor-pointer hover:underline">
              See all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
