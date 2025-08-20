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
    return response.data;
  }

  async getWordList(request: WordListRequest): Promise<WordListResponse> {
    const { limit, orientation, cursor } = request
    const response = await api.get(`/entries/en?limit=${limit}&cursor=${cursor}&orientation=${orientation}`);
    return response.data;
  }

  async getFavorites(request: FavoritesRequest): Promise<FavoritesResponse> {
    const { limit, orientation, cursor } = request
    const response = await api.get(`/user/me/favorites?limit=${limit}&cursor=${cursor}&orientation=${orientation}`);
    return response.data;
  }

  async getHistory(request: HistoryRequest): Promise<HistoryResponse> {
    const { limit, orientation, cursor } = request
    const response = await api.get(`/user/me/history?limit=${limit}&cursor=${cursor}&orientation=${orientation}`);
    return response.data;
  }

  async favorite({ word }: FavoriteRequest): Promise<void> {
    await api.post(`/entries/en/${word}/favorite`);
  }

  async unfavorite({ word }: UnfavoriteRequest): Promise<void> {
    await api.delete(`/entries/en/${word}/unfavorite`);
  }
}