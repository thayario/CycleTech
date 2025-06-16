package com.cycletech.repository;

import com.cycletech.model.CollectionPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CollectionPointRepository extends JpaRepository<CollectionPoint, Long> {
    
    @Query(value = "SELECT * FROM collection_points WHERE " +
           "ST_DWithin(ST_MakePoint(longitude, latitude)::geography, " +
           "ST_MakePoint(:longitude, :latitude)::geography, :radius)", 
           nativeQuery = true)
    List<CollectionPoint> findNearbyPoints(
        @Param("latitude") Double latitude,
        @Param("longitude") Double longitude,
        @Param("radius") Double radius
    );

    List<CollectionPoint> findByIsActiveTrue();
} 