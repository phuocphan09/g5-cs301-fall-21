package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Interest;

import java.util.Collections;
import java.util.List;

public class InterestResponse {

    private String response_type;
    private List<Interest> interest_list = Collections.emptyList();

    public String getResponse_type() {
        return response_type;
    }

    public void setResponse_type(String response_type) {
        this.response_type = response_type;
    }

    public List<Interest> getInterest_list() {
        return interest_list;
    }

    public void setInterest_list(List<Interest> interest_list) {
        this.interest_list = interest_list;
    }
}
