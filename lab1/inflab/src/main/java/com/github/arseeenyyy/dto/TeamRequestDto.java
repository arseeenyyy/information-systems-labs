package com.github.arseeenyyy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamRequestDto {
    private String name;
    private List<Long> memberIds;
    private Long assignedCaveId;
}