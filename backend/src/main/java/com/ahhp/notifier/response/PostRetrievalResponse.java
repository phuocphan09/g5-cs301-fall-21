package com.ahhp.notifier.response;

import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

public class PostRetrievalResponse {

    @Autowired
    PostRepository postRepository;

    private String result;
    private List<PostInput> content = new ArrayList<PostInput>();

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public List<PostInput> getContent() {
        return content;
    }

    public void setContent(List<PostInput> content) {
        this.content = content;
    }
}
