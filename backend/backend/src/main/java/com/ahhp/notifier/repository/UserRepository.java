package com.ahhp.notifier.repository;

import com.ahhp.notifier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByEmail(String userEmail);
    List<User> findByEmailIn(List<String> emails);
}
