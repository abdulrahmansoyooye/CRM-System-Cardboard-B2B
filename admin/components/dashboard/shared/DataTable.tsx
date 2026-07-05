"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  pageSize?: number;
  emptyTitle?: string;
  emptySubtitle?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  searchPlaceholder = "Search...",
  searchKey,
  pageSize = 10,
  emptyTitle = "No data found",
  emptySubtitle = "There are no records to display at the moment.",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredData = React.useMemo(() => {
    let result = [...data];

    const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
      return path.split('.').reduce<unknown>((acc, part) => {
        if (acc && typeof acc === "object" && part in acc) {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, obj);
    };

    if (search && searchKey) {
      result = result.filter((item) => {
        const value = item[searchKey];
        return String(value).toLowerCase().includes(search.toLowerCase());
      });
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a as unknown as Record<string, unknown>, sortField);
        const bValue = getNestedValue(b as unknown as Record<string, unknown>, sortField);

        if (typeof aValue !== "number" || typeof bValue !== "number") return 0;
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, searchKey, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Search & Meta */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input pl-12"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {paginatedData.length} of {filteredData.length} records
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={cn(
                      "px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",
                      col.sortable && "cursor-pointer hover:text-slate-900 transition-colors",
                      col.className
                    )}
                    onClick={() => col.sortable && handleSort(col.accessorKey as string)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && <ArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array(pageSize)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      {columns.map((_, j) => (
                        <td key={j} className="px-7 py-5">
                          <Skeleton className="h-6 w-full opacity-50" />
                        </td>
                      ))}
                    </tr>
                  ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    {columns.map((col, jdx) => (
                      <td key={jdx} className={cn("px-7 py-5", col.className)}>
                        {col.cell ? col.cell(item) : String((item as Record<string, unknown>)[col.accessorKey as string] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-7 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300">
                        <PackageOpen className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{emptyTitle}</h4>
                        <p className="text-sm text-slate-400">{emptySubtitle}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                // Complex pagination logic
                if (totalPages > 7) {
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    "w-10 h-10 rounded-xl text-xs font-black transition-all",
                                    currentPage === page 
                                        ? "bg-slate-900 text-white shadow-lg" 
                                        : "text-slate-500 hover:bg-slate-100"
                                )}
                            >
                                {page}
                            </button>
                        );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={i} className="w-10 h-10 flex items-center justify-center text-slate-300">...</span>;
                    }
                    return null;
                }
                return (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                            "w-10 h-10 rounded-xl text-xs font-black transition-all",
                            currentPage === page 
                                ? "bg-slate-900 text-white shadow-lg" 
                                : "text-slate-500 hover:bg-slate-100"
                        )}
                    >
                        {page}
                    </button>
                )
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
