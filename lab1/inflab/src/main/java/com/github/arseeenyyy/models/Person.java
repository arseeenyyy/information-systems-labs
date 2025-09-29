package com.github.arseeenyyy.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Entity
@Table(name = "person") 
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false) 
    @NotBlank
    private String name; //Поле не может быть null, Строка не может быть пустой

    @Enumerated(EnumType.STRING) 
    @Column(name = "eye_color", nullable = false) 
    private Color eyeColor; //Поле не может быть null

    @Enumerated(EnumType.STRING) 
    @Column(name = "hair_color", nullable = false) 
    private Color hairColor; //Поле может быть null

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) 
    @JoinColumn(name = "location_id") 
    @NotNull
    private Location location; //Поле может быть null
    
    @Column(name = "height", nullable = false) 
    @Positive
    private int height; //Значение поля должно быть больше 0
    
    @Enumerated(EnumType.STRING) 
    private Country nationality; //Поле может быть null
}