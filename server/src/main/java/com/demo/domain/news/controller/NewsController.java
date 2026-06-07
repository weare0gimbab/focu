package com.demo.domain.news.controller;

import com.demo.domain.news.dto.NewsItem;
import com.demo.domain.news.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<List<NewsItem>> getNews(
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(newsService.getLatestNews(size));
    }
}