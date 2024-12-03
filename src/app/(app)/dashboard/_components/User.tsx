"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit3 } from "lucide-react";
import { Select2 } from "@/components/ui/select2";

const users = [
  { name: "Alice Johnson", batch: "2025", role: "admin" },
  { name: "Bob Smith", batch: "2026", role: "alumini" },
  { name: "Charlie Brown", batch: "2024", role: "alumini" },
  { name: "Daisy Miller", batch: "2025", role: "admin" },
  { name: "Ethan White", batch: "2025", role: "guest" },
  { name: "Fiona Green", batch: "2026", role: "guest" },
  { name: "George Black", batch: "2027", role: "admin" },
  { name: "Hannah Blue", batch: "2023", role: "alumini" },
  { name: "Daisy Miller", batch: "2025", role: "admin" },
  { name: "Ethan White", batch: "2025", role: "guest" },
  { name: "Fiona Green", batch: "2026", role: "guest" },
  { name: "George Black", batch: "2027", role: "admin" },
  { name: "Hannah Blue", batch: "2023", role: "alumini" },
  { name: "Ivy Red", batch: "2024", role: "guest" },
  { name: "Jack Gray", batch: "2025", role: "admin" },
];

const User = () => {
  const [resourceOption, setResourceOption] = useState("No filter");

  // Dropdown options
  const domainOptions = [
    { value: "all", label: "All Resources" },
    { value: "guest", label: "Guest" },
    { value: "aluminus", label: "Aluminus" },
    { value: "admin", label: "Admins" },
    { value: "contributors", label: "Contributors" },
    { value: "nofilter", label: "No Filter" },
  ];

  return (
    <>
      <Select2
        className="my-6 w-48"
        data={domainOptions}
        value={resourceOption}
        onChange={setResourceOption}
        placeholder="Filter"
      />

      <Table className="overflow-hidden rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[100px]">Batch</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name} className="hover:bg-gray-50">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.batch}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  aria-label={`Edit ${user.name}`}
                >
                  <Edit3 />
                </button>
              </TableCell>
              <TableCell className="text-right">
                <button
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Delete ${user.name}`}
                >
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default User;
