package com.github.arseeenyyy.controller;

import com.github.arseeenyyy.dto.TeamRequestDto;
import com.github.arseeenyyy.dto.TeamResponseDto;
import com.github.arseeenyyy.service.TeamService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/teams")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TeamController {
    
    @Inject
    private TeamService teamService;
    
    @GET
    public List<TeamResponseDto> getAll() {
        return teamService.getAll();
    }
    
    @GET
    @Path("/{id}")
    public TeamResponseDto getById(@PathParam("id") Long id) {
        return teamService.getById(id);
    }
    
    @POST
    public Response create(TeamRequestDto requestDto) {
        try {
            TeamResponseDto response = teamService.create(requestDto);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating team: " + e.getMessage())
                    .build();
        }
    }
    
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, TeamRequestDto requestDto) {
        try {
            TeamResponseDto response = teamService.update(id, requestDto);
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating team: " + e.getMessage())
                    .build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            teamService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error deleting team: " + e.getMessage())
                    .build();
        }
    }
    
    @POST
    @Path("/{teamId}/members")
    public Response addMembersToTeam(@PathParam("teamId") Long teamId, List<Long> memberIds) {
        try {
            teamService.addMembersToTeam(teamId, memberIds);
            return Response.ok("Members successfully added to team").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error adding members to team: " + e.getMessage())
                    .build();
        }
    }
    
    @DELETE
    @Path("/members/{personId}")
    public Response removeMemberFromTeam(@PathParam("personId") Long personId) {
        try {
            teamService.removeMemberFromTeam(personId);
            return Response.ok("Member successfully removed from team").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error removing member from team: " + e.getMessage())
                    .build();
        }
    }
    
    @POST
    @Path("/{teamId}/assign-cave")
    public Response assignToCave(@PathParam("teamId") Long teamId, AssignCaveRequest request) {
        try {
            TeamResponseDto response = teamService.assignToCave(teamId, request.getCaveId());
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error assigning team to cave: " + e.getMessage())
                    .build();
        }
    }
    
    @GET
    @Path("/{teamId}/members")
    public Response getTeamMembers(@PathParam("teamId") Long teamId) {
        try {
            var members = teamService.getTeamMembers(teamId);
            return Response.ok(members).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error getting team members: " + e.getMessage())
                    .build();
        }
    }
    
    public static class AssignCaveRequest {
        private Long caveId;
        
        public Long getCaveId() { return caveId; }
        public void setCaveId(Long caveId) { this.caveId = caveId; }
    }
}