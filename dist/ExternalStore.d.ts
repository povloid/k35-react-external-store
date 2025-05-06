export interface Cursor<S> {
    get(): S;
    get<V>(fn: (state: S) => V): V;
    set(state: S): Cursor<S>;
    update(fn: (state: S) => S): Cursor<S>;
    push(): void;
    subscribe(listener: () => void): () => void;
    createCursorOn<K extends keyof S>(key: K): Cursor<S[K]>;
}
export declare const useCursor: <S>(store: Cursor<S>) => S;
export declare class ExternalStore<S> implements Cursor<S> {
    readonly initState: S;
    private listeners;
    private state;
    constructor(initState: S);
    subscribe(listener: () => void): () => void;
    get(): S;
    get<V>(fn: (state: S) => V): V;
    set(state: S): this;
    getSnapshot(): S;
    update(fn: (state: S) => S): this;
    push(): void;
    createCursorOn<K extends keyof S>(key: K): Cursor<S[K]>;
}
export declare class ExternalStoreCursor<S, SS> implements Cursor<SS> {
    private readonly cursor;
    private readonly getSnapshotAt;
    private readonly updateAt;
    private listeners;
    constructor(cursor: Cursor<S>, getSnapshotAt: (state: S) => SS, updateAt: (state: S, subState: SS) => S);
    get(): SS;
    get<V>(fn: (state: SS) => V): V;
    getSnapshot(): SS;
    set(state: SS): this;
    update(fn: (state: SS) => SS): this;
    subscribe(listener2: () => void): () => void;
    push(): void;
    createCursorOn<K extends keyof SS>(key: K): Cursor<SS[K]>;
}
