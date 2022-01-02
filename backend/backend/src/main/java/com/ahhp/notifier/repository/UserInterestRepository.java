package com.ahhp.notifier.repository;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.entity.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {

    List<UserInterest> findByUser (User user); // find all using user
    List<UserInterest> findByInterest (Interest interest);
    List<UserInterest> findByUserAndInterest(User user, Interest interest);

}
