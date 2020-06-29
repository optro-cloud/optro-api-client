export default class Cache extends Map {
    private maxAge;
    private expires;
    private interval;
    constructor(maxAge: any, interval: any);
    ms(ttl: any): any;
    now(): number;
    has(key: string): boolean;
    delete(key: string): boolean;
    trim(): Set<string>;
    check(key: any): boolean;
    get(key: any): any;
    set(key: string, value: any, maxAge: any): this;
    clear(): void;
    get size(): number;
    proxy(fn: any, maxAge: any): () => Promise<any>;
}
