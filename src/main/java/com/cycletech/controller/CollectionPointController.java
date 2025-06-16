package com.cycletech.controller;

import com.cycletech.model.CollectionPoint;
import com.cycletech.repository.CollectionPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection-points")
@CrossOrigin(origins = "*")
public class CollectionPointController {

    @Autowired
    private CollectionPointRepository repository;

    @GetMapping
    public List<CollectionPoint> getAllPoints() {
        return repository.findByIsActiveTrue();
    }

    @GetMapping("/nearby")
    public List<CollectionPoint> getNearbyPoints(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5000") Double radius) {
        return repository.findNearbyPoints(latitude, longitude, radius);
    }

    @PostMapping
    public CollectionPoint createPoint(@RequestBody CollectionPoint point) {
        return repository.save(point);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionPoint> updatePoint(
            @PathVariable Long id,
            @RequestBody CollectionPoint point) {
        return repository.findById(id)
                .map(existingPoint -> {
                    point.setId(id);
                    return ResponseEntity.ok(repository.save(point));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePoint(@PathVariable Long id) {
        return repository.findById(id)
                .map(point -> {
                    point.setIsActive(false);
                    repository.save(point);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 