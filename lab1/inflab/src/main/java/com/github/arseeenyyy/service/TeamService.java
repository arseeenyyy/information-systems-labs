package com.github.arseeenyyy.service;

import com.github.arseeenyyy.dto.TeamRequestDto;
import com.github.arseeenyyy.dto.TeamResponseDto;
import com.github.arseeenyyy.mapper.TeamMapper;
import com.github.arseeenyyy.models.DragonCave;
import com.github.arseeenyyy.models.Person;
import com.github.arseeenyyy.models.Team;
import com.github.arseeenyyy.repository.DragonCaveRepository;
import com.github.arseeenyyy.repository.PersonRepository;
import com.github.arseeenyyy.repository.TeamRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class TeamService {
    
    @Inject
    private TeamRepository teamRepository;

    @Inject
    private PersonRepository personRepository;

    @Inject
    private DragonCaveRepository caveRepository;

    @Transactional
    public TeamResponseDto create(TeamRequestDto requestDto) {
        // Проверяем, что имя команды уникально
        Team existingTeam = teamRepository.findByName(requestDto.getName());
        if (existingTeam != null) {
            throw new RuntimeException("Team with name '" + requestDto.getName() + "' already exists");
        }

        Team team = TeamMapper.toEntity(requestDto);

        // Устанавливаем назначенную пещеру если указана
        if (requestDto.getAssignedCaveId() != null) {
            DragonCave cave = caveRepository.findById(requestDto.getAssignedCaveId());
            if (cave == null) {
                throw new RuntimeException("Cave not found with id: " + requestDto.getAssignedCaveId());
            }
            team.setAssignedCave(cave);
        }

        Team savedTeam = teamRepository.save(team);

        // Добавляем членов команды
        if (requestDto.getMemberIds() != null && !requestDto.getMemberIds().isEmpty()) {
            addMembersToTeam(savedTeam.getId(), requestDto.getMemberIds());
        }

        return toResponseDto(savedTeam);
    }

    @Transactional
    public void addMembersToTeam(Long teamId, List<Long> memberIds) {
        Team team = teamRepository.findById(teamId);
        if (team == null) {
            throw new RuntimeException("Team not found with id: " + teamId);
        }

        for (Long memberId : memberIds) {
            Person person = personRepository.findById(memberId);
            if (person != null) {
                person.setTeamId(teamId);
                personRepository.update(person);
            }
        }
    }

    @Transactional
    public void removeMemberFromTeam(Long personId) {
        Person person = personRepository.findById(personId);
        if (person != null) {
            person.setTeamId(null);
            personRepository.update(person);
        }
    }

    @Transactional
    public TeamResponseDto assignToCave(Long teamId, Long caveId) {
        Team team = teamRepository.findById(teamId);
        if (team == null) {
            throw new RuntimeException("Team not found with id: " + teamId);
        }

        DragonCave cave = caveRepository.findById(caveId);
        if (cave == null) {
            throw new RuntimeException("Cave not found with id: " + caveId);
        }

        // Проверяем, пустая ли пещера
        boolean isCaveEmpty = checkIfCaveIsEmpty(caveId);
        if (!isCaveEmpty) {
            throw new RuntimeException("Cave is not empty. Cannot assign team to occupied cave.");
        }

        team.setAssignedCave(cave);
        Team updatedTeam = teamRepository.update(team);
        return toResponseDto(updatedTeam);
    }

    private boolean checkIfCaveIsEmpty(Long caveId) {
        // Здесь можно добавить логику проверки, есть ли драконы в пещере
        // Пока считаем все пещеры пустыми для демонстрации
        return true;
    }

    public List<TeamResponseDto> getAll() {
        List<Team> teams = teamRepository.findAll();
        return teams.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public TeamResponseDto getById(Long id) {
        Team team = teamRepository.findById(id);
        if (team == null) {
            throw new RuntimeException("Team not found with id: " + id);
        }
        return toResponseDto(team);
    }

    @Transactional
    public void delete(Long id) {
        // Убираем teamId у всех членов команды перед удалением
        List<Person> teamMembers = personRepository.findByTeamId(id);
        for (Person member : teamMembers) {
            member.setTeamId(null);
            personRepository.update(member);
        }
        
        teamRepository.delete(id);
    }

    public List<Person> getTeamMembers(Long teamId) {
        return personRepository.findByTeamId(teamId);
    }

    // Вспомогательный метод для преобразования Team в TeamResponseDto
    private TeamResponseDto toResponseDto(Team team) {
        List<Person> members = personRepository.findByTeamId(team.getId());
        return TeamMapper.toResponseDto(team, members);
    }

    @Transactional
    public TeamResponseDto update(Long id, TeamRequestDto requestDto) {
        Team existingTeam = teamRepository.findById(id);
        if (existingTeam == null) {
            throw new RuntimeException("Team not found with id: " + id);
        }

        // Проверяем уникальность имени (если имя изменилось)
        if (!existingTeam.getName().equals(requestDto.getName())) {
            Team teamWithSameName = teamRepository.findByName(requestDto.getName());
            if (teamWithSameName != null) {
                throw new RuntimeException("Team with name '" + requestDto.getName() + "' already exists");
            }
        }

        existingTeam.setName(requestDto.getName());

        // Обновляем назначенную пещеру если указана
        if (requestDto.getAssignedCaveId() != null) {
            DragonCave cave = caveRepository.findById(requestDto.getAssignedCaveId());
            if (cave == null) {
                throw new RuntimeException("Cave not found with id: " + requestDto.getAssignedCaveId());
            }
            existingTeam.setAssignedCave(cave);
        } else {
            existingTeam.setAssignedCave(null);
        }

        Team updatedTeam = teamRepository.update(existingTeam);

        // Обновляем членов команды если указаны
        if (requestDto.getMemberIds() != null) {
            List<Person> currentMembers = personRepository.findByTeamId(id);
            for (Person member : currentMembers) {
                member.setTeamId(null);
                personRepository.update(member);
            }
            
            // Затем добавляем новых
            if (!requestDto.getMemberIds().isEmpty()) {
                addMembersToTeam(id, requestDto.getMemberIds());
            }
        }

        return toResponseDto(updatedTeam);
    }
}