package com.backend.demo.entities;

import com.backend.demo.constants.ReadingGoalType;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reading_goals")
public class ReadingGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "progress")
    private Integer progress;

    @Column(name = "progress_goal")
    private Integer progressGoal;

    @Column(name = "type", nullable = false)
    private ReadingGoalType type;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getProgress() {
        return progress;
    }

    public Integer getProgressGoal() {
        return progressGoal;
    }

    public ReadingGoalType getType() {
        return type;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public void setProgressGoal(Integer progressGoal) {
        this.progressGoal = progressGoal;
    }

    public void setType(ReadingGoalType type) {
        this.type = type;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
