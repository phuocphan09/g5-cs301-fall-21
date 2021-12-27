package com.ahhp.notifier.response;

import com.ahhp.notifier.entity.Interest;

import java.util.Collections;
import java.util.List;

public class InterestListResponse {

    private String response_type;
    private List<Interest> active_interest_list;

    public String getResponse_type() {
        return response_type;
    }

    public void setResponse_type(String response_type) {
        this.response_type = response_type;
    }

    public List<Interest> getInterest_list() {
        return active_interest_list;
    }

    public void setInterest_list(List<Interest> interest_list) {
        this.active_interest_list = interest_list;
    }
}
