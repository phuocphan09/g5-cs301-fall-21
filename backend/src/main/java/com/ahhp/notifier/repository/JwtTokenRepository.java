package com.ahhp.notifier.repository;

import com.ahhp.notifier.entity.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {

    public List<JwtToken> findByToken(String token);
    public List<JwtToken> findByUserId(String userId);

}
