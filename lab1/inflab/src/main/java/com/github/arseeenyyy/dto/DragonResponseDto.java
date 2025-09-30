package com.github.arseeenyyy.dto;

import com.github.arseeenyyy.models.Color;
import com.github.arseeenyyy.models.Coordinates;
import com.github.arseeenyyy.models.DragonCave;
import com.github.arseeenyyy.models.DragonCharacter;
import com.github.arseeenyyy.models.DragonHead;
import com.github.arseeenyyy.models.Person;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DragonResponseDto {
    private Long id;
    private String name;
    private Coordinates coordinates;
    private java.time.LocalDate creationDate;
    private DragonCave cave;
    private Person killer;
    private Integer age;
    private double weight;
    private Color color;
    private DragonCharacter character;
    private DragonHead head;
}