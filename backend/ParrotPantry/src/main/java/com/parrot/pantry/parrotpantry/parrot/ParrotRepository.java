package com.parrot.pantry.parrotpantry.parrot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParrotRepository extends JpaRepository<Parrot, Integer> {

}
