package com.github.arseeenyyy.mapper;

import com.github.arseeenyyy.dto.PersonRequestDto;
import com.github.arseeenyyy.dto.PersonResponseDto;
import com.github.arseeenyyy.models.Location;
import com.github.arseeenyyy.models.Person;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonMapper {

    public static Person toEntity(PersonRequestDto requestDto, Location location) {
        Person person = new Person();
        person.setName(requestDto.getName()); 
        person.setEyeColor(requestDto.getEyeColor());
        person.setHairColor(requestDto.getHairColor()); 
        person.setLocation(location); 
        person.setHeight(requestDto.getHeight());
        person.setNationality(requestDto.getNationality());
        return person;
    }

    public static PersonResponseDto toResponseDto(Person person) {
        return new PersonResponseDto(
            person.getId(), 
            person.getName(), 
            person.getEyeColor(), 
            person.getHairColor(), 
            LocationMapper.toResponseDto(person.getLocation()), 
            person.getHeight(), 
            person.getNationality()
        );
    }
}