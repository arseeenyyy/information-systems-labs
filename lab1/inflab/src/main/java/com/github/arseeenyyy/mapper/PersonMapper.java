package com.github.arseeenyyy.mapper;

import com.github.arseeenyyy.dto.PersonRequestDto;
import com.github.arseeenyyy.dto.PersonResponseDto;
import com.github.arseeenyyy.models.Person;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonMapper {

    public Person toEntity(PersonRequestDto requestDto) {
        Person person = new Person();
        person.setName(requestDto.getName()); 
        person.setEyeColor(requestDto.getEyeColor());
        person.setHairColor(requestDto.getHairColor()); 
        person.setLocation(requestDto.getLocation()); 
        person.setHeight(requestDto.getHeight());
        person.setNationality(requestDto.getNationality());
        return person;
    }

    public PersonResponseDto toResponseDto(Person person) {
        return new PersonResponseDto(
            person.getId(), 
            person.getName(), 
            person.getEyeColor(), 
            person.getHairColor(), 
            person.getLocation(), 
            person.getHeight(), 
            person.getNationality()
        );
    }
}