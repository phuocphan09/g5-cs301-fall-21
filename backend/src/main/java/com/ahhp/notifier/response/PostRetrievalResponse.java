package com.ahhp.notifier.response;

import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

public class PostRetrievalResponse {

    @Autowired
    PostRepository postRepository;

    private String result;
    private List<Post> content;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public List<Post> getContent() {
        return content;
    }

    public void setContent(List<Post> content) {
        this.content = content;
    }
}
