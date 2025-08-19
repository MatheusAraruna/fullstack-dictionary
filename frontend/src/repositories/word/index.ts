import { api } from "@/lib/http-client";
import type { 
  DictionaryRequest,
  DictionaryResponse,
  FavoriteRequest, 
  FavoritesRequest, 
  FavoritesResponse, 
  HistoryRequest, 
  HistoryResponse, 
  UnfavoriteRequest, 
  WordListRequest, 
  WordListResponse, 
} from "@/types/api/word";

export class WordRepository {
  constructor() {}

  async getDictionary({ word }: DictionaryRequest): Promise<DictionaryResponse> {
    const response = await api.get(`/entries/en/${word}`);
    return response.data[0];
  }

  async getWordList(request: WordListRequest): Promise<WordListResponse> {
    const { limit, order, page, search } = request
    const response = await api.get(`/entries/en?limit=${limit}&search=${search}&page=${page}&orientation=${order}`);
    return response.data;
  }

  async getFavorites(request: FavoritesRequest): Promise<FavoritesResponse> {
    const { limit, order, page, search } = request
    const response = await api.get(`/user/me/favorites?limit=${limit}&search=${search}&page=${page}&orientation=${order}`);
    return response.data;
  }

  async getHistory(request: HistoryRequest): Promise<HistoryResponse> {
    const { limit, order, page, search } = request
    const response = await api.get(`/user/me/history?limit=${limit}&search=${search}&page=${page}&orientation=${order}`);
    return response.data;
  }

  async favorite({ word }: FavoriteRequest): Promise<void> {
    await api.post(`/entries/en/${word}/favorite`);
  }

  async unfavorite({ word }: UnfavoriteRequest): Promise<void> {
    await api.delete(`/entries/en/${word}/unfavorite`);
  }
}