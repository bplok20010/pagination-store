export interface PaginationOptions {
	total: number;
	current?: number;
	pageSize?: number;
	pageRange?: number;
}

export interface PData {
	page: number | null;
	isCurrent?: boolean;
	isPreviousMore?: boolean;
	isNextMore?: boolean;
}

export function getPageList(options: PaginationOptions) {
	const store = new PaginationStore(options);
	return store.getCurrentList();
}

export const version = "%VERSION%";

export class PaginationStore {
	total: number;
	current: number;
	pageSize: number;
	pageRange: number;

	constructor(options: PaginationOptions = { total: 0 }) {
		this.total = options.total || 0;
		this.current = options.current || 1;
		this.pageSize = options.pageSize || 20;
		this.pageRange = options.pageRange || 5;
	}

	getPageTotal() {
		const { total, pageSize } = this;
		return Math.max(Math.ceil(total / pageSize), 1);
	}

	getPrevious() {
		const current = this.current;

		return current <= 1 ? null : current - 1;
	}

	getNext() {
		const total = this.getPageTotal();
		const current = this.current;

		return current >= total ? null : current + 1;
	}

	previous() {
		const prev = this.getPrevious();

		return prev ? ((this.current = prev), true) : false;
	}

	next() {
		const next = this.getNext();

		return next ? ((this.current = next), true) : false;
	}

	isFirstPage(current: number) {
		return current <= 1;
	}

	isLastPage(current: number) {
		const total = this.getPageTotal();
		return current >= total;
	}

	getCurrentList() {
		const { pageRange, current } = this;
		const pageTotal = this.getPageTotal();
		const p = ~~(pageRange / 2); //Math.floor

		const list: PData[] = [];
		let end = Math.min(current + p, pageTotal - 1);
		const start = Math.max(end - pageRange + 1, 2);

		list.push({
			page: 1,
			isCurrent: current === 1,
		});
		//showPrevMore
		if (start > 2) {
			list.push({
				page: null,
				isPreviousMore: true,
			});
		}

		const cpn = end - start + 1;

		if (cpn < pageRange) {
			end = Math.min(pageTotal - 1, end + pageRange - cpn);
		}

		for (let page = start; page <= end; page++) {
			list.push({
				page: page,
				isCurrent: current === page,
			});
		}
		//showNextMore
		if (end < pageTotal - 1) {
			list.push({
				page: null,
				isNextMore: true,
			});
		}

		if (pageTotal > 1) {
			list.push({
				page: pageTotal,
				isCurrent: current === pageTotal,
			});
		}

		return list;
	}
}

export default PaginationStore;
