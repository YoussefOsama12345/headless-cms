const Skill = require('../models/skill.model');

const createSkill = async (skillData) => {
  const skill = await Skill.create(skillData);
  return skill;
};

const getSkills = async ()=>{
  const skills = await Skill.findAll();
  if(!skills){
    throw new Error('Skills not found');
  }
  return skills;
}

const getSkillById = async (id)=>{
  const skill = await Skill.findByPk(id);
  if(!skill){
    throw new Error('Skill not found');
  }
  return skill;
}

const updateSkill = async (id, skillData)=>{
  const updatedSkill = await Skill.findByPk(id);
  const [affectedRows] = await Skill.update(skillData, { where: { id } });
  if(affectedRows === 0){
    throw new Error('Skill not found');
  }


  return updatedSkill;
}

const deleteSkill = async (id)=>{
  const deletedSkill = await Skill.findByPk(id);
  const deletedRows = await Skill.destroy({  where: { id } });
  if(deletedRows === 0){
    throw new Error('Skill not found');
  }


  return deletedSkill;
}

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
