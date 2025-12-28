'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Calendar, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableFilter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  filters?: DataTableFilter[];
  searchable?: boolean;
  searchPlaceholder?: string;
  dateRangeFilter?: boolean;
  statusIndicator?: {
    total: number;
    active: number;
    label: string;
  };
  pagination?: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions?: number[];
  };
  onRowAction?: (row: T, action: string) => void;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  filters = [],
  searchable = true,
  searchPlaceholder = "Search...",
  dateRangeFilter = false,
  statusIndicator,
  pagination = { enabled: false, pageSize: 10, pageSizeOptions: [5, 10, 20, 50] },
  onRowAction,
  className = "",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination.pageSize);

  // Filter data based on search, filters, and date range
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply column filters
    Object.entries(activeFilters).forEach(([filterKey, values]) => {
      if (values.length > 0) {
        result = result.filter((row) => {
          const rowValue = String(row[filterKey]).toLowerCase();
          return values.some((filterValue) =>
            rowValue.includes(filterValue.toLowerCase())
          );
        });
      }
    });

    // Apply date range filter (assumes there's a 'date' or 'createdAt' field)
    if (dateRange.start || dateRange.end) {
      result = result.filter((row) => {
        const rowDate = new Date(row.date || row.createdAt || row.timestamp);
        const startDate = dateRange.start ? new Date(dateRange.start) : new Date('1970-01-01');
        const endDate = dateRange.end ? new Date(dateRange.end) : new Date();
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, dateRange, columns]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Handle different data types
      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue && bValue && typeof aValue === 'object' && typeof bValue === 'object' &&
                 'getTime' in aValue && 'getTime' in bValue) {
        // Date comparison
        comparison = (aValue as Date).getTime() - (bValue as Date).getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate sorted data
  const paginatedData = useMemo(() => {
    if (!pagination.enabled) {
      return sortedData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination.enabled]);

  // Calculate pagination info
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, sortedData.length);

  const handleSort = (columnKey: keyof T) => {
    if (sortColumn === columnKey) {
      // Cycle through: asc -> desc -> null
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') {
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterKey] || [];
      if (checked) {
        return { ...prev, [filterKey]: [...currentValues, value] };
      } else {
        return { ...prev, [filterKey]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const getSortIcon = (columnKey: keyof T) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-40" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 ml-1 text-blue-600" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="w-4 h-4 ml-1 text-blue-600" />;
    }
    return <ArrowUpDown className="w-4 h-4 ml-1 opacity-40" />;
  };

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-background border rounded-lg mt-4">
        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <div key={filter.key} className="relative">
            <select
              className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  handleFilterChange(filter.key, value, true);
                }
              }}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        ))}

        {/* Date Range Filter */}
        {dateRangeFilter && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Search Input */}
        {searchable && (
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {/* Status Indicator */}
        {statusIndicator && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="font-medium">{statusIndicator.label}</span>
              <span className="text-muted-foreground">
                {statusIndicator.active}/{statusIndicator.total}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {Object.entries(activeFilters).some(([_, values]) => values.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 px-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(activeFilters).map(([filterKey, values]) =>
            values.map((value) => (
              <span
                key={`${filterKey}-${value}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {value}
                <button
                  onClick={() => handleFilterChange(filterKey, value, false)}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters({})}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="bg-background border rounded-lg overflow-hidden flex flex-col">
        <div className="overflow-auto max-w-full max-h-[430px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1">
          <table className="w-full min-w-[800px]">
            {/* Header */}
            <thead className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`text-left p-4 font-medium text-sm ${
                      column.sortable ? 'cursor-pointer hover:bg-muted/70' : ''
                    }`}
                    style={{ width: column.width }}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
                {onRowAction && (
                  <th className="w-12 p-4"></th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (onRowAction ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    {columns.map((column) => (
                      <td key={String(column.key)} className="p-4 text-sm">
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key])
                        }
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRowAction(row, 'menu')}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination */}
        {pagination.enabled ? (
          <div className="flex items-center justify-between p-4 border-t bg-muted/20">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                Showing {startItem} to {endItem} of {sortedData.length} results
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="border border-border rounded px-2 py-1 text-sm bg-background"
                >
                  {pagination.pageSizeOptions?.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first, last, current, and adjacent pages
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t bg-muted/20 text-sm text-muted-foreground">
            Showing {sortedData.length} of {data.length} results
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>
    </div>
  );
}