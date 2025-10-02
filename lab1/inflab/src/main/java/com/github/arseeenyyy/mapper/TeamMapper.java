package com.github.arseeenyyy.mapper;

import com.github.arseeenyyy.dto.TeamRequestDto;
import com.github.arseeenyyy.dto.TeamResponseDto;
import com.github.arseeenyyy.models.Person;
import com.github.arseeenyyy.models.Team;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class TeamMapper {

    public static Team toEntity(TeamRequestDto requestDto) {
        Team team = new Team();
        team.setName(requestDto.getName());
        return team;
    }

    public static TeamResponseDto toResponseDto(Team team, List<Person> members) {
        if (team == null) {
            return null;
        }

        return new TeamResponseDto(
            team.getId(),
            team.getName(),
            members.stream()
                   .map(PersonMapper::toResponseDto)
                   .collect(Collectors.toList()),
            team.getAssignedCave() != null ? DragonCaveMapper.toResponseDto(team.getAssignedCave()) : null
        );
    }
}