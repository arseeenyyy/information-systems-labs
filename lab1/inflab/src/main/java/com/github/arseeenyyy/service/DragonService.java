package com.github.arseeenyyy.service;

import com.github.arseeenyyy.dto.DragonRequestDto;
import com.github.arseeenyyy.dto.DragonResponseDto;
import com.github.arseeenyyy.mapper.DragonMapper;
import com.github.arseeenyyy.models.Coordinates;
import com.github.arseeenyyy.models.Dragon;
import com.github.arseeenyyy.models.DragonCave;
import com.github.arseeenyyy.models.DragonHead;
import com.github.arseeenyyy.models.Person;
import com.github.arseeenyyy.repository.CoordinatesRepository;
import com.github.arseeenyyy.repository.DragonCaveRepository;
import com.github.arseeenyyy.repository.DragonHeadRepository;
import com.github.arseeenyyy.repository.DragonRepository;
import com.github.arseeenyyy.repository.PersonRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class DragonService {
    
    @Inject
    private DragonRepository dragonRepository;

    @Inject 
    private CoordinatesRepository coordinatesRepository;

    @Inject
    private PersonRepository personRepository;

    @Inject
    private DragonCaveRepository dragonCaveRepository;

    @Inject  
    private DragonHeadRepository dragonHeadRepository;
    

    @Transactional
    public DragonResponseDto create(DragonRequestDto requestDto) {
        Coordinates coordinates = coordinatesRepository.findById(requestDto.getCoordinatesId());
        Person killer = personRepository.findById(requestDto.getKillerId());
        DragonCave cave = dragonCaveRepository.findById(requestDto.getCaveId());
        DragonHead head = dragonHeadRepository.findById(requestDto.getHeadId());

        if (coordinates == null) {
            throw new RuntimeException("incorrect id's of related objects");
        }
        
        Dragon dragon = DragonMapper.toEntity(requestDto, coordinates, cave, killer, head);
        Dragon savedDragon = dragonRepository.save(dragon);
        return DragonMapper.toResponseDto(savedDragon);
    }
    
    @Transactional
    public List<DragonResponseDto> getAll() {
        List<Dragon> dragons = dragonRepository.findAll();
        return dragons.stream()
                .map(DragonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    public DragonResponseDto getById(Long id) {
        Dragon dragon = dragonRepository.findById(id);
        if (dragon == null) {
            throw new RuntimeException("Dragon not found with id: " + id); 
        }
        return DragonMapper.toResponseDto(dragon);
    }
    
    @Transactional
    public void delete(Long id) {
        dragonRepository.delete(id);
    }
    
    @Transactional
    public DragonResponseDto update(Long id, DragonRequestDto requestDto) {
        Dragon existingDragon = dragonRepository.findById(id);
        if (existingDragon == null) {
            throw new RuntimeException("Dragon not found with id: " + id);
        }        
        existingDragon.setName(requestDto.getName());
        existingDragon.setAge(requestDto.getAge());
        existingDragon.setWeight(requestDto.getWeight());
        existingDragon.setColor(requestDto.getColor());
        existingDragon.setCharacter(requestDto.getCharacter());
        
        Dragon updatedDragon = dragonRepository.update(existingDragon);
        return DragonMapper.toResponseDto(updatedDragon);
    }
    
    public List<DragonResponseDto> findByColor(String color) {
        List<Dragon> dragons = dragonRepository.findByColor(color);
        return dragons.stream()
                .map(DragonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
}