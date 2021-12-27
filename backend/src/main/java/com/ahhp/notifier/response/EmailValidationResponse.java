package com.ahhp.notifier.response;

<<<<<<< HEAD:backend/src/main/java/com/ahhp/notifier/response/EmailCheckResponse.java
public class EmailCheckResponse {
=======
public class EmailValidationResponse {
>>>>>>> apifix:backend/src/main/java/com/ahhp/notifier/response/EmailValidationResponse.java

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
