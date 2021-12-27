package com.ahhp.notifier.response;

public class AccountValidationResponse {

    private boolean result;
    private String user;

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
