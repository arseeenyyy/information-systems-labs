package com.github.arseeenyyy.service;

import com.github.arseeenyyy.dto.DragonRequestDto;
import com.github.arseeenyyy.dto.DragonResponseDto;
import com.github.arseeenyyy.mapper.DragonMapper;
import com.github.arseeenyyy.models.Dragon;
import com.github.arseeenyyy.repository.DragonRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class DragonService {
    
    @Inject
    private DragonRepository repository;
    
    @Transactional
    public DragonResponseDto create(DragonRequestDto requestDto) {
        Dragon dragon = DragonMapper.toEntity(requestDto);
        Dragon savedDragon = repository.save(dragon);
        return DragonMapper.toResponseDto(savedDragon);
    }
    
    public List<DragonResponseDto> getAll() {
        List<Dragon> dragons = repository.findAll();
        return dragons.stream()
                .map(DragonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    public DragonResponseDto getById(Long id) {
        Dragon dragon = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dragon not found with id: " + id));
        return DragonMapper.toResponseDto(dragon);
    }
    
    @Transactional
    public void delete(Long id) {
        repository.delete(id);
    }
    
    @Transactional
    public DragonResponseDto update(Long id, DragonRequestDto requestDto) {
        Dragon existingDragon = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dragon not found with id: " + id));
        
        existingDragon.setName(requestDto.getName());
        existingDragon.setAge(requestDto.getAge());
        existingDragon.setWeight(requestDto.getWeight());
        existingDragon.setColor(requestDto.getColor());
        existingDragon.setCharacter(requestDto.getCharacter());
        
        Dragon updatedDragon = repository.update(existingDragon);
        return DragonMapper.toResponseDto(updatedDragon);
    }
    
    public List<DragonResponseDto> findByColor(String color) {
        List<Dragon> dragons = repository.findByColor(color);
        return dragons.stream()
                .map(DragonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
}