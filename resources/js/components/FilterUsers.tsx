import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = ["admin", "faculty", "student"];

export default function SearchUsers() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);

  return (
    <div className="flex space-x-4">
      {/* Filter by status */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filter by role */}
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </SelectItem>
            ))}
            <SelectItem value="all">All</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Sort order */}
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Order</SelectLabel>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
