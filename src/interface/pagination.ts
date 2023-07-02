export type paginatedOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type Ifilters = {
  searchTerm?: string;
  // minPrice?: number;
  // maxPrice?: number;
  location?: string;
};
