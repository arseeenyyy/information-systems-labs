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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter; 

@Setter
@Getter
@AllArgsConstructor 
@Entity
@Table(name = "dragon") 
public class Dragon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //Поле не может быть null, Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    
    @Column(name = "name", nullable = false)
    @NotBlank
    private String name; //Поле не может быть null, Строка не может быть пустой

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinates_id", nullable = false) 
    @NotNull
    private Coordinates coordinates; //Поле не может быть null

    @Column(name = "creation_date", nullable = false, updatable = false)
    private java.time.LocalDate creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cave_id")
    private DragonCave cave; //Поле может быть null

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "killer_id")
    private Person killer; //Поле может быть null

    @Column(nullable = false)
    @Positive
    @NotNull
    private Integer age; //Значение поля должно быть больше 0, Поле не может быть null

    @Column(name = "weight", nullable = false) 
    @Positive
    private double weight; //Значение поля должно быть больше 0

    @Enumerated(EnumType.STRING) 
    @Column(name = "color")
    private Color color; //Поле может быть null

    @Enumerated(EnumType.STRING)
    @Column(name = "dragon_character") 
    private DragonCharacter character; //Поле может быть null
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) 
    @Column(name = "head_id")
    private DragonHead head;

    @Builder
    public Dragon(String name, Coordinates coordinates, DragonCave cave, 
                 Person killer, Integer age, double weight, Color color, 
                 DragonCharacter character, DragonHead head) {
        this.name = name;
        this.coordinates = coordinates;
        this.cave = cave;
        this.killer = killer;
        this.age = age;
        this.weight = weight;
        this.color = color;
        this.character = character;
        this.head = head;
        this.creationDate = java.time.LocalDate.now(); 
    }
}
