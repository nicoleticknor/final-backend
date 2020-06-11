const express = require('express');
const router = express.Router();

// ?? Routes mounted on /api

const {
  selectAllClassesByMonth,
  selectAllClassesByDay,
  selectAllDaysofMonth,
  selectAllTeachers,
  selectAllDisciplines,
  selectAllPrograms,
  selectAllDifficulties,
  selectClassesByDay
} = require('../queries/filteringQueries');

module.exports = (db) => {
  router.get("/:month_id", async (req, res) => {
    try {
      const id = req.params.month_id
      const responseObject = {}
      const teachers = await db.query(selectAllTeachers)
      responseObject.teachers = teachers.rows
      const disciplines = await db.query(selectAllDisciplines)
      responseObject.disciplines = disciplines.rows
      const programs = await db.query(selectAllPrograms)
      responseObject.programs = programs.rows
      const difficulties = await db.query(selectAllDifficulties)
      responseObject.difficulties = difficulties.rows
      //this needs to be fixed
      const classes = await db.query(selectAllClassesByMonth, [id])
      const days = await db.query(selectAllDaysofMonth, [id])
      responseObject.days = days.row
      res.send(responseObject);
    }
    catch (error) {
      throw error
    }
  });

  return router;
};
