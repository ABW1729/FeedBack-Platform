const express = require('express');
const Response = require('../models/Response');
const router = express.Router();

router.post('/:id/submit', async (req, res) => {
const { name, answers } = req.body;
  if (!name || !answers) {
    return res.status(400).json({ error: 'Name and answers are required.' });
  }
  const submission = new Response({
    formId: req.params.id,
    name:name,
    answers: req.body.answers
  });
  await submission.save();
  res.json({ message: 'Response recorded' });
});

router.get('/:id/submissions', async (req, res) => {
  const responses = await Response.find({ formId: req.params.id });
  console.log(responses);
  res.json(responses);
});

module.exports = router;
