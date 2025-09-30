package com.github.arseeenyyy.service;

import com.github.arseeenyyy.dto.PersonRequestDto;
import com.github.arseeenyyy.dto.PersonResponseDto;
import com.github.arseeenyyy.mapper.PersonMapper;
import com.github.arseeenyyy.models.Person;
import com.github.arseeenyyy.repository.PersonRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class PersonService {
    
    @Inject
    private PersonRepository repository;
    
    @Transactional
    public PersonResponseDto create(PersonRequestDto requestDto) {
        Person person = PersonMapper.toEntity(requestDto);
        Person savedPerson = repository.save(person);
        return PersonMapper.toResponseDto(savedPerson);
    }
    
    public List<PersonResponseDto> getAll() {
        List<Person> persons = repository.findAll();
        return persons.stream()
                .map(PersonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    public PersonResponseDto getById(Long id) {
        Person person = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
        return PersonMapper.toResponseDto(person);
    }
    
    @Transactional
    public void delete(Long id) {
        repository.delete(id);
    }
    
    @Transactional
    public PersonResponseDto update(Long id, PersonRequestDto requestDto) {
        Person existingPerson = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
        
        existingPerson.setName(requestDto.getName());
        existingPerson.setEyeColor(requestDto.getEyeColor());
        existingPerson.setHairColor(requestDto.getHairColor());
        existingPerson.setHeight(requestDto.getHeight());
        existingPerson.setNationality(requestDto.getNationality());
        
        Person updatedPerson = repository.update(existingPerson);
        return PersonMapper.toResponseDto(updatedPerson);
    }
    
    public List<PersonResponseDto> findByEyeColor(String eyeColor) {
        List<Person> persons = repository.findByEyeColor(eyeColor);
        return persons.stream()
                .map(PersonMapper::toResponseDto)
                .collect(Collectors.toList());
    }
}