package com.ahhp.notifier.repository;

import com.ahhp.notifier.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {

    public List<Post> findByPoster(String poster); // fake poster, not used
    public List<Post> findByTitle(String title);
    public List<Post> findByPosterAndTitle(String poster, String title);

}
