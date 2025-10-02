package com.github.arseeenyyy.repository;

import com.github.arseeenyyy.models.Person;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped 
public class PersonRepository {
    
    @PersistenceContext 
    private EntityManager entityManager;

    @Transactional 
    public Person save(Person person) {
        entityManager.persist(person); 
        return person;
    } 

    public List<Person> findAll() {
        return entityManager.createQuery("SELECT p FROM Person p", Person.class)
            .getResultList();
    }

    // public Optional<Person> findById(Long id) {
    //     Person person = entityManager.find(Person.class, id);
    //     return Optional.ofNullable(person);
    // }

    public Person findById(Long id) {
        return entityManager.find(Person.class, id);
    }

    @Transactional 
    public void delete(Long id) {
        Person person = entityManager.find(Person.class, id);
        if (person != null) {
            entityManager.remove(person);
        }
    }

    @Transactional
    public Person update(Person person) {
        return entityManager.merge(person);
    }

    public List<Person> findByEyeColor(String eyeColor) {
        return entityManager.createQuery(
            "SELECT p FROM Person p WHERE p.eyeColor = :eyeColor", Person.class)
            .setParameter("eyeColor", eyeColor)
            .getResultList();
    }
}