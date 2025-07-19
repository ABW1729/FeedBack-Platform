const express = require('express');
const Response = require('../models/Response');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;
const router = express.Router();
const Form = require('../models/Form');

router.get('/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;

    const form = await Form.findById(formId).lean();
    if (!form) return res.status(404).send('Form not found');

    const responses = await Response.find({ formId }).lean();
    if (responses.length === 0) return res.status(400).send('No responses found');

    const questions = form.questions.map((q) => q.question);

    const headers = [
      { id: 'index', title: '#' },
      { id: 'name', title: 'Name' },
      { id: 'submittedOn', title: 'Submitted On' },
      ...questions.map((q) => ({ id: q, title: q })),
    ];

    const csvStringifier =createCsvWriter({ header: headers });

    const records = responses.map((res, index) => {
      const row = {
        index: index + 1,
        name: res.name,
        submittedOn: new Date(res.createdAt).toLocaleString(),
      };

      res.answers.forEach((ans) => {
        row[ans.question] = Array.isArray(ans.answer)
          ? ans.answer.join(', ')
          : ans.answer;
      });

      return row;
    });

    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="responses.csv"');
    res.status(200).send(csv);

  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
