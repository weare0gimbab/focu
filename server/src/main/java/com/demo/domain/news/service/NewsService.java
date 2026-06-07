package com.demo.domain.news.service;

import com.demo.domain.news.dto.NewsItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class NewsService {

    @Value("${public-api.news.service-key}")
    private String serviceKey;

    private static final String BASE_URL =
            "http://apis.data.go.kr/1371000/policyNewsService/policyNewsList";
    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyyMMdd");

    // 이 API는 날짜 범위로 조회하며 최대 3일 이내만 허용
    public List<NewsItem> getLatestNews(int maxSize) {
        String today = LocalDate.now().format(FMT);
        String twoDaysAgo = LocalDate.now().minusDays(2).format(FMT);

        String url = BASE_URL
                + "?serviceKey=" + serviceKey
                + "&startDate=" + twoDaysAgo
                + "&endDate=" + today;

        RestTemplate restTemplate = new RestTemplate();
        String xmlResponse = restTemplate.getForObject(url, String.class);

        List<NewsItem> all = parseXml(xmlResponse);
        return all.size() > maxSize ? all.subList(0, maxSize) : all;
    }

    private List<NewsItem> parseXml(String xml) {
        List<NewsItem> result = new ArrayList<>();
        try {
            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));

            // 에러 응답 체크
            NodeList codeNode = doc.getElementsByTagName("resultCode");
            if (codeNode.getLength() > 0 && !"0".equals(codeNode.item(0).getTextContent())) {
                String msg = doc.getElementsByTagName("resultMsg").item(0).getTextContent();
                throw new RuntimeException("공공API 오류: " + msg);
            }

            NodeList items = doc.getElementsByTagName("NewsItem");
            for (int i = 0; i < items.getLength(); i++) {
                Element el = (Element) items.item(i);
                result.add(new NewsItem(
                        getText(el, "NewsItemId"),
                        getText(el, "Title"),
                        getText(el, "SubTitle1"),
                        getText(el, "ApproveDate"),
                        getText(el, "ThumbnailUrl"),
                        getText(el, "OriginalUrl")));
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("뉴스 파싱 실패", e);
        }
        return result;
    }

    private String getText(Element el, String tag) {
        NodeList nl = el.getElementsByTagName(tag);
        return nl.getLength() > 0 ? nl.item(0).getTextContent().trim() : "";
    }
}
