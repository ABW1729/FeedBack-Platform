const express = require('express');
const Response = require('../models/Response');
const router = express.Router();

router.post('/:id/submit', async (req, res) => {
  try {
    const { name, answers } = req.body;

    if (!name || !answers) {
      return res.status(400).json({ error: 'Name and answers are required.' });
    }

    const submission = new Response({
      formId: req.params.id,
      name,
      answers,
    });

    await submission.save();
    res.json({ message: 'Response recorded' });
  } catch (err) {
    console.error('Error submitting response:', err);
    res.status(500).json({ error: 'Failed to record response' });
  }
});

router.get('/:id/submissions', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.id });
    console.log(responses);
    res.json(responses);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});


module.exports = router;
