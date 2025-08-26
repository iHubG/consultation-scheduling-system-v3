import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';
import type { SharedData } from '@/types';

export function Notification() {
  const { notifications } = usePage<SharedData>().props;
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

        {count === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          <>
            {notifications.map(({ id, title, description, time, link }) => (
              <Link
                key={id}
                href={link || '#'}
                className="block"
              >
                <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer hover:bg-accent/40">
                  <span className="font-medium">{title}</span>
                  {description && (
                    <span className="text-sm text-muted-foreground">{description}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{time}</span>
                </DropdownMenuItem>
              </Link>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
