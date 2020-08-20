export const sortByTypes = {
  DESC: { text: "descending", sortOrder: 1, class: "sort-header-desc" },
  ASC: { text: "ascending", sortOrder: -1, class: "sort-header-asc" },
  NONE: { text: "none", sortOrder: 0, class: "sort-header-none" },
};

export default {
  authors: [],
  courses: [],
  apiCallsInProgress: 0,
  sortStatus: {
    title: { sortType: sortByTypes.NONE, name: "title" },
    authorId: { sortType: sortByTypes.NONE, name: "authorId" },
    category: { sortType: sortByTypes.NONE, name: "category" },
  },
};
