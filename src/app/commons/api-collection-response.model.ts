export class ApiCollectionResponse<T> {
    hasNext: boolean;
    items: T[];
    page: number;
    pageSize: number;
}