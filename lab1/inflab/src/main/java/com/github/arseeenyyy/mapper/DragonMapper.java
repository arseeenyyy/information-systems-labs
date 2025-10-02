package com.github.arseeenyyy.mapper;

import com.github.arseeenyyy.dto.DragonRequestDto;
import com.github.arseeenyyy.dto.DragonResponseDto;
import com.github.arseeenyyy.models.Coordinates;
import com.github.arseeenyyy.models.Dragon;
import com.github.arseeenyyy.models.DragonCave;
import com.github.arseeenyyy.models.DragonHead;
import com.github.arseeenyyy.models.Person;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped 
public class DragonMapper {
    
    public static Dragon toEntity(DragonRequestDto requestDto, Coordinates coordinates, DragonCave cave, Person killer, DragonHead head) {
        Dragon dragon = new Dragon(); 
        dragon.setName(requestDto.getName()); 
        dragon.setCoordinates(coordinates); 
        dragon.setCave(cave);
        dragon.setKiller(killer); 
        dragon.setAge(requestDto.getAge()); 
        dragon.setWeight(requestDto.getWeight()); 
        dragon.setColor(requestDto.getColor()); 
        dragon.setCharacter(requestDto.getCharacter()); 
        dragon.setHead(head);
        return dragon;
    }

    public static DragonResponseDto toResponseDto(Dragon dragon) {
        return new DragonResponseDto(
            dragon.getId(), 
            dragon.getName(), 
            CoordinatesMapper.toResponseDto(dragon.getCoordinates()), 
            dragon.getCreationDate(), 
            DragonCaveMapper.toResponseDto(dragon.getCave()), 
            PersonMapper.toResponseDto(dragon.getKiller()), 
            dragon.getAge(), 
            dragon.getWeight(), 
            dragon.getColor(), 
            dragon.getCharacter(), 
            DragonHeadMapper.toResponseDto(dragon.getHead())
        );
    }
}