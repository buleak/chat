export interface AxiosConfig {
    baseURL: string | undefined;
    transformRequest: ((data: any, headers: any) => string)[];
    transformResponse: ((data: any) => any)[];
    headers: {};
    timeout: number;
    withCredentials: boolean;
}