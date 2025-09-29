package com.github.arseeenyyy.repository;

import com.github.arseeenyyy.models.Location;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class LocationRepository {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Transactional
    public Location save(Location location) {
        entityManager.persist(location);
        return location;
    }
    
    public List<Location> findAll() {
        return entityManager.createQuery("SELECT l FROM Location l", Location.class)
                .getResultList();
    }
    
    public Optional<Location> findById(Long id) {
        Location location = entityManager.find(Location.class, id);
        return Optional.ofNullable(location);
    }
    
    @Transactional
    public void delete(Long id) {
        Location location = entityManager.find(Location.class, id);
        if (location != null) {
            entityManager.remove(location);
        }
    }
    
    @Transactional
    public Location update(Location location) {
        return entityManager.merge(location);
    }
}