const { PaginationStore, getPageList } = require("../lib");

test("PaginationStore", () => {
	var store = new PaginationStore({
		total: 101,
		current: 1,
		pageSize: 10,
		pageRange: 5,
	});

	expect(store.previous()).toEqual(false);
	expect(store.next()).toEqual(true);

	expect(store.current).toEqual(2);
	expect(store.getNext()).toEqual(3);
	expect(store.isFirstPage(1)).toEqual(true);
	expect(store.isFirstPage(-1)).toEqual(true);
	expect(store.isFirstPage(2)).toEqual(false);
	expect(store.isLastPage(11)).toEqual(true);
	expect(store.isLastPage(12)).toEqual(true);
	expect(store.isLastPage(10)).toEqual(false);

	expect(store.getCurrentList()).toEqual([
		{ page: 1, isCurrent: false },
		{ page: 2, isCurrent: true },
		{ page: 3, isCurrent: false },
		{ page: 4, isCurrent: false },
		{ page: 5, isCurrent: false },
		{ page: 6, isCurrent: false },
		{ page: null, isNextMore: true },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 6,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: null, isPreviousMore: true },
		{ page: 4, isCurrent: false },
		{ page: 5, isCurrent: false },
		{ page: 6, isCurrent: true },
		{ page: 7, isCurrent: false },
		{ page: 8, isCurrent: false },
		{ page: null, isNextMore: true },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 3,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: 2, isCurrent: false },
		{ page: 3, isCurrent: true },
		{ page: 4, isCurrent: false },
		{ page: 5, isCurrent: false },
		{ page: 6, isCurrent: false },
		{ page: null, isNextMore: true },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 9,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: null, isPreviousMore: true },
		{ page: 6, isCurrent: false },
		{ page: 7, isCurrent: false },
		{ page: 8, isCurrent: false },
		{ page: 9, isCurrent: true },
		{ page: 10, isCurrent: false },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 10,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: null, isPreviousMore: true },
		{ page: 6, isCurrent: false },
		{ page: 7, isCurrent: false },
		{ page: 8, isCurrent: false },
		{ page: 9, isCurrent: false },
		{ page: 10, isCurrent: true },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 8,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: null, isPreviousMore: true },
		{ page: 6, isCurrent: false },
		{ page: 7, isCurrent: false },
		{ page: 8, isCurrent: true },
		{ page: 9, isCurrent: false },
		{ page: 10, isCurrent: false },
		{ page: 11, isCurrent: false },
	]);

	expect(
		getPageList({
			total: 101,
			current: 11,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: false },
		{ page: null, isPreviousMore: true },
		{ page: 6, isCurrent: false },
		{ page: 7, isCurrent: false },
		{ page: 8, isCurrent: false },
		{ page: 9, isCurrent: false },
		{ page: 10, isCurrent: false },
		{ page: 11, isCurrent: true },
	]);

	expect(
		getPageList({
			total: 101,
			current: 1,
			pageSize: 10,
			pageRange: 5,
		})
	).toEqual([
		{ page: 1, isCurrent: true },
		{ page: 2, isCurrent: false },
		{ page: 3, isCurrent: false },
		{ page: 4, isCurrent: false },
		{ page: 5, isCurrent: false },
		{ page: 6, isCurrent: false },
		{ page: null, isNextMore: true },
		{ page: 11, isCurrent: false },
	]);
});
