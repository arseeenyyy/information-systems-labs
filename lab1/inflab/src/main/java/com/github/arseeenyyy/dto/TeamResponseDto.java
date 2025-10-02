package com.github.arseeenyyy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamResponseDto {
    private Long id;
    private String name;
    private List<PersonResponseDto> members;
    private DragonCaveResponseDto assignedCave;
}