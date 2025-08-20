/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Dictionary, Word } from "../entities";
import type { 
    CursorPaginationMeta, 
    CursorPaginationParams, 
    PaginationMeta, 
    PaginationParams } from "./common";

// Request Types
export interface DictionaryRequest {
    word: string;
}

export interface WordListRequest extends CursorPaginationParams {}

export interface FavoritesRequest extends PaginationParams {}

export interface HistoryRequest extends PaginationParams {}

export interface FavoriteRequest {
    word: string;
}

export interface UnfavoriteRequest {
    word: string;
}

// Response Types
export interface DictionaryResponse extends Dictionary {}

export interface WordListResponse extends CursorPaginationMeta {
    results: string[];
}

export interface FavoritesResponse extends PaginationMeta {
    results: Word[];
}

export interface HistoryResponse extends PaginationMeta {
    results: Word[];
}



