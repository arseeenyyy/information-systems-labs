package com.github.arseeenyyy.mapper;

import com.github.arseeenyyy.dto.DragonRequestDto;
import com.github.arseeenyyy.dto.DragonResponseDto;
import com.github.arseeenyyy.models.Dragon;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped 
public class DragonMapper {
    
    public Dragon toEntity(DragonRequestDto requestDto) {
        Dragon dragon = new Dragon(); 
        dragon.setName(requestDto.getName()); 
        dragon.setCoordinates(requestDto.getCoordinates()); 
        dragon.setCave(requestDto.getCave());
        dragon.setKiller(requestDto.getKiller()); 
        dragon.setAge(requestDto.getAge()); 
        dragon.setWeight(requestDto.getWeight()); 
        dragon.setColor(requestDto.getColor()); 
        dragon.setCharacter(requestDto.getCharacter()); 
        dragon.setHead(requestDto.getHead());
        return dragon;
    }

    public DragonResponseDto toResponseDto(Dragon dragon) {
        return new DragonResponseDto(
            dragon.getId(), 
            dragon.getName(), 
            dragon.getCoordinates(), 
            dragon.getCreationDate(), 
            dragon.getCave(), 
            dragon.getKiller(), 
            dragon.getAge(), 
            dragon.getWeight(), 
            dragon.getColor(), 
            dragon.getCharacter(), 
            dragon.getHead()
        );
    }
}