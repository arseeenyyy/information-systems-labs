package com.github.arseeenyyy.repository;

import com.github.arseeenyyy.models.Team;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped 
public class TeamRepository {
    
    @PersistenceContext 
    private EntityManager entityManager;

    @Transactional 
    public Team save(Team team) {
        entityManager.persist(team); 
        return team;
    } 

    public List<Team> findAll() {
        return entityManager.createQuery("SELECT t FROM Team t", Team.class)
            .getResultList();
    }

    public Team findById(Long id) {
        if (id == null) {
            return null;
        }
        return entityManager.find(Team.class, id);
    }

    @Transactional 
    public void delete(Long id) {
        Team team = entityManager.find(Team.class, id);
        if (team != null) {
            entityManager.remove(team);
        }
    }

    @Transactional
    public Team update(Team team) {
        return entityManager.merge(team);
    }

    public Team findByName(String name) {
        try {
            return entityManager.createQuery(
                "SELECT t FROM Team t WHERE t.name = :name", Team.class)
                .setParameter("name", name)
                .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
}