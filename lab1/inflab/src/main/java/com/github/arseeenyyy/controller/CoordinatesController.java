package com.github.arseeenyyy.controller;

import com.github.arseeenyyy.dto.CoordinatesRequestDto;
import com.github.arseeenyyy.dto.CoordinatesResponseDto;
import com.github.arseeenyyy.service.CoordinatesService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/coordinates")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CoordinatesController {
    
    @Inject
    private CoordinatesService coordinatesService;
    
    @GET
    public List<CoordinatesResponseDto> getAll() {
        return coordinatesService.getAll();
    }
    
    @GET
    @Path("/{id}")
    public CoordinatesResponseDto getById(@PathParam("id") Long id) {
        return coordinatesService.getById(id);
    }
    
    @POST
    public Response create(CoordinatesRequestDto requestDto) {
        try {
            CoordinatesResponseDto response = coordinatesService.create(requestDto);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating coordinates: " + e.getMessage())
                    .build();
        }
    }
    
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, CoordinatesRequestDto requestDto) {
        try {
            CoordinatesResponseDto response = coordinatesService.update(id, requestDto);
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating coordinates: " + e.getMessage())
                    .build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            coordinatesService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error deleting coordinates: " + e.getMessage())
                    .build();
        }
    }
    
    
    @GET
    @Path("/count")
    public Response count() {
        long count = coordinatesService.count();
        return Response.ok().entity(count).build();
    }
    
    // @GET
    // @Path("/{id}/exists")
    // public Response exists(@PathParam("id") Long id) {
    //     boolean exists = coordinatesService.existsById(id);
    //     return Response.ok().entity(exists).build();
    // }
    
    @GET
    @Path("/test")
    public Response test() {
        return Response.ok("coordinates working mathafacka").build();
    }
}