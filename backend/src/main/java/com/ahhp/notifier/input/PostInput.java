package com.ahhp.notifier.input;

import java.util.List;

public class PostInput {
    private String poster;
    private String title;
    private String description;
    private String[] interestList;
    private Long timeStamp;

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getInterestList() {
        return interestList;
    }

    public void setInterestList(String[] interestList) {
        this.interestList = interestList;
    }

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
