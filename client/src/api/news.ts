import { api } from './axios'

export interface NewsItem {
  title: string
  description: string
  url: string
  pubDate: string
}

export const getNews = (size = 5) =>
  api.get<NewsItem[]>(`/api/news?size=${size}`).then((r) => r.data)
