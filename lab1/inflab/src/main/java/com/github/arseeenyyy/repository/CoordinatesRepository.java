package com.github.arseeenyyy.repository;

import java.util.List;
import java.util.Optional;

import com.github.arseeenyyy.models.Coordinates;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped 
public class CoordinatesRepository {
    
    @PersistenceContext 
    private EntityManager entityManager;

    @Transactional 
    public Coordinates save(Coordinates coordinates) {
        entityManager.persist(coordinates); 
        return coordinates;
    } 

    public List<Coordinates> findAll() {
        return entityManager.createQuery("SELECT C FROM Coordinates C", Coordinates.class)
            .getResultList();
    }

    public Optional<Coordinates> findById(Long id) {
        Coordinates coordinates = entityManager.find(Coordinates.class, id);
        return Optional.ofNullable(coordinates);
    }

    @Transactional 
    public void delete(Long id) {
        Coordinates coordinates = entityManager.find(Coordinates.class, id);
        if (coordinates != null) {
            entityManager.remove(coordinates);
        }
    }

    @Transactional
    public Coordinates update(Coordinates coordinates) {
        return entityManager.merge(coordinates);
    }

}