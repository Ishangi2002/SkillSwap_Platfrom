package com.webproject.vswapp_backend.mapper;

import com.webproject.vswapp_backend.dto.SkillDto;
import com.webproject.vswapp_backend.entity.Skill;
import com.webproject.vswapp_backend.entity.Category;

public class SkillMapper {

    public static Skill mapToSkill(SkillDto skillDto) {
        Skill skill = new Skill();

        // Copy data from skillDto → skill
        skill.setId(skillDto.getId());
        skill.setTitle(skillDto.getTitle());
        skill.setLevel(skillDto.getLevel());
        skill.setAbout(skillDto.getAbout());
        skill.setImagePath(skillDto.getImagePath());

        // Handle category (if it exists in skillDto)
        if (skillDto.getCategory() != null) {
            Category category = new Category();
            category.setCategoryName(skillDto.getCategory());
            skill.setCategory(category);
        }

        return skill;
    }

    public static SkillDto mapToSkillDto(Skill skill) {
        SkillDto skillDto = new SkillDto();
        skillDto.setId(skill.getId());
        skillDto.setTitle(skill.getTitle());
        skillDto.setLevel(skill.getLevel());
        skillDto.setAbout(skill.getAbout());
        if (skill.getImagePath() != null) {
            skillDto.setImagePath("http://localhost:8080/uploads/skills/" + skill.getImagePath());
        }

        if(skill.getCategory() != null) {
            skillDto.setCategory(skill.getCategory().getCategoryName());
        }
        if (skill.getUser() != null) {
            skillDto.setUserId(skill.getUser().getId());
        }
        return skillDto;
    }
}
