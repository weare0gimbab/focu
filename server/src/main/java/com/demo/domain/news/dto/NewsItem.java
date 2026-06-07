package com.demo.domain.news.dto;

public record NewsItem(
                String newsItemId,
                String title,
                String subTitle,
                String approveDate,
                String thumbnailUrl,
                String originalUrl) {
}