package com.ahhp.notifier.response;

import com.ahhp.notifier.entity.Interest;

import java.util.Collections;
import java.util.List;

public class InterestListResponse {

    private String responseType;
    private List<Interest> activeInterestList;
    private List<Interest> addableInteresList;

    public String getResponseType() {
        return responseType;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public List<Interest> getActiveInterestList() {
        return activeInterestList;
    }

    public void setActiveInterestList(List<Interest> activeInterestList) {
        this.activeInterestList = activeInterestList;
    }

    public List<Interest> getAddableInteresList() {
        return addableInteresList;
    }

    public void setAddableInteresList(List<Interest> addableInteresList) {
        this.addableInteresList = addableInteresList;
    }
}
