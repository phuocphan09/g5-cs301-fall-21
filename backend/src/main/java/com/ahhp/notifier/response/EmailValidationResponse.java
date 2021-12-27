package com.ahhp.notifier.response;

public class EmailValidationResponse {

    private boolean valid;
    private boolean created;

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public boolean isCreated() {
        return created;
    }

    public void setCreated(boolean created) {
        this.created = created;
    }
}
