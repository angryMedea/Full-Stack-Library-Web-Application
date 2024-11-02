package com.pageturner.spring_boot_library.dao;
import com.pageturner.spring_boot_library.entity.Payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Payment findByUserEmail(String userEmail);
}
