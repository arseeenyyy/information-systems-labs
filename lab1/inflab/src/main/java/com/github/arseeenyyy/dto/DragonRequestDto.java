package com.github.arseeenyyy.dto;

import com.github.arseeenyyy.models.Color;
import com.github.arseeenyyy.models.Coordinates;
import com.github.arseeenyyy.models.DragonCave;
import com.github.arseeenyyy.models.DragonCharacter;
import com.github.arseeenyyy.models.DragonHead;
import com.github.arseeenyyy.models.Person;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@AllArgsConstructor 
public class DragonRequestDto {
    @NotNull
    @NotBlank
    private String name;

    @NotNull 
    private Coordinates coordinates;

    private DragonCave cave;

    private Person killer;

    @NotNull
    @Min(1)
    private Integer age;

    @Min(1) 
    @NotNull
    private double weight;

    private Color color;

    private DragonCharacter character;
    private DragonHead head;
}