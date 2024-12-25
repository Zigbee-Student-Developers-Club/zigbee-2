"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchOptions } from "@/lib/options";
import { useFetchUsers } from "@/lib/SWRhooks/useSWR";
import { UserData } from "@/lib/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DeleteDialogBox from "@/app/(app)/dashboard/_components/DeleteDialogBox";
import { deleteUserById } from "@/lib/axios/allApiCall";
import UserUpdateDialogBox from "./userUpdateDialogBox";
import { Switch } from "@/components/ui/switch";

const UserTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [batch, setBatch] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isContributor, setIsContributor] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<string | null>();
  const [page, setPage] = useState<number>(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userDataUpdateDialogOpen, setUserDataUpdateDialogOpen] =
    useState(false);

  const { userList, pagination, isLoading, error, refreshUsers } =
    useFetchUsers(role, batch, page, isAdmin, isContributor);

  const handleDeleteClick = useCallback((user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((user: UserData) => {
    setSelectedUser(user);
    setUserDataUpdateDialogOpen(true);
  }, []);
  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "batch",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Batch
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("batch")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditClick(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(row.original)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteConfirm = useCallback(async () => {
    if (selectedUser) {
      try {
        const response = await deleteUserById(selectedUser?.id || ""); // Delete the user by ID

        if ("message" in response) {
          // If deletion is successful, log success and refresh users list
          alert(`${selectedUser.name} deleted successfully.`);
          // Refresh the data using mutate function to update the user list
          refreshUsers(); // No need for await, just call mutate
        } else {
          alert(response.error || "Failed to delete user. Please try again. ");
        }
      } catch (error) {
        alert(
          (error as Error).message || "Failed to delete user. Please try again."
        );
      } finally {
        setIsDeleteDialogOpen(false); // Close the delete confirmation dialog
        setSelectedUser(null); // Reset selected user
      }
    }
  }, [selectedUser, refreshUsers]);

  const handleSaveChanges = () => {
    console.log("triggered");
  };

  useEffect(() => {
    setPage(1);
  }, [role, batch]);

  const table = useReactTable({
    data: userList,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: 20,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: pagination?.totalPages,
  });

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="my-4 space-y-4">
        <div className="flex items-center justify-between gap-6">
          <input
            type="text"
            placeholder="Search...(not implemented)"
            className="w-[240px] rounded-md border border-gray-300 p-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          <div>
            <Select value={batch} onValueChange={(value) => setBatch(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Batches</SelectLabel>
                  {BatchOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value as unknown as string}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="student">student</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span>Is Admin</span>
            <Switch
              checked={isAdmin}
              onCheckedChange={(value) => setIsAdmin(value)}
              className="shadcn-switch"
            />
          </div>

          <div className="flex items-center gap-4">
            <span>Is Contributor</span>
            <Switch
              checked={isContributor}
              onCheckedChange={(value) => setIsContributor(value)}
              className="shadcn-switch"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {(error as Error).message ||
                    "Failed to load data. Try again."}
                </TableCell>
              </TableRow>
            ) : userList?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!pagination?.previousPage}
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!pagination?.nextPage}
        >
          Next
        </Button>
      </div>

      {/* Delete Dialog */}
      <DeleteDialogBox
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onContinue={handleDeleteConfirm}
        message={`Are you sure you want to delete "${selectedUser?.name}"?`}
      />
      {/* user data update dialog box */}
      {selectedUser && (
        <UserUpdateDialogBox
          isOpen={userDataUpdateDialogOpen}
          onClose={() => setUserDataUpdateDialogOpen(false)}
          onSave={handleSaveChanges}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserTable;
