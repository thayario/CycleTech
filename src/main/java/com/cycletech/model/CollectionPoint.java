package com.cycletech.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "collection_points")
public class CollectionPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @ElementCollection
    @CollectionTable(name = "accepted_materials", joinColumns = @JoinColumn(name = "collection_point_id"))
    @Column(name = "material")
    private List<String> acceptedMaterials;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;
} 