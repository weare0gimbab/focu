import { useEffect, useState } from 'react'
import { getNews, type NewsItem } from '../../api/news'

export default function NewsCard() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    getNews(3).then(setNews).catch(console.error)
  }, [])

  return (
    <div>
      <h3>오늘의 정책 뉴스</h3>
      {news.map((item, i) => (
        <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
          <p>{item.title}</p>
          <small>{item.pubDate}</small>
        </a>
      ))}
    </div>
  )
}
