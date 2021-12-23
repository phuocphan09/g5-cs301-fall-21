package com.ahhp.notifier.repository;

import com.ahhp.notifier.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findByInterestName (String interestName);

}
