package com.github.arseeenyyy.service;

import com.github.arseeenyyy.dto.CoordinatesRequestDto;
import com.github.arseeenyyy.dto.CoordinatesResponseDto;
import com.github.arseeenyyy.mapper.CoordinatesMapper;
import com.github.arseeenyyy.models.Coordinates;
import com.github.arseeenyyy.repository.CoordinatesRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class CoordinatesService {
    
    @Inject
    private CoordinatesRepository repository;
        
    @Transactional
    public CoordinatesResponseDto create(CoordinatesRequestDto requestDto) {
        Coordinates coordinates = CoordinatesMapper.toEntity(requestDto);
        Coordinates savedCoordinates = repository.save(coordinates);
        return CoordinatesMapper.toResponseDto(savedCoordinates);
    }
    
    public List<CoordinatesResponseDto> getAll() {
        List<Coordinates> coordinates = repository.findAll();
        return coordinates.stream()
                .map(CoordinatesMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    public CoordinatesResponseDto getById(Long id) {
        Coordinates coordinates = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coordinates not found with id: " + id));
        return CoordinatesMapper.toResponseDto(coordinates);
    }
    
    @Transactional
    public void delete(Long id) {
        repository.delete(id);
    }
    
    @Transactional
    public CoordinatesResponseDto update(Long id, CoordinatesRequestDto requestDto) {
        Coordinates existingCoordinates = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coordinates not found with id: " + id));
        
        existingCoordinates.setX(requestDto.getX());
        existingCoordinates.setY(requestDto.getY());
        
        Coordinates updatedCoordinates = repository.update(existingCoordinates);
        return CoordinatesMapper.toResponseDto(updatedCoordinates);
    }
    
    
    public long count() {
        return repository.findAll().size();
    }
    
    public boolean existsById(Long id) {
        return repository.findById(id).isPresent();
    }
}