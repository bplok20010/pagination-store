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
export declare function getPageList(options: PaginationOptions): PData[];
export declare const version = "%VERSION%";
export declare class PaginationStore {
    total: number;
    current: number;
    pageSize: number;
    pageRange: number;
    constructor(options?: PaginationOptions);
    getPageTotal(): number;
    getPrevious(): number | null;
    getNext(): number | null;
    previous(): boolean;
    next(): boolean;
    isFirstPage(current: number): boolean;
    isLastPage(current: number): boolean;
    getCurrentList(): PData[];
}
export default PaginationStore;
