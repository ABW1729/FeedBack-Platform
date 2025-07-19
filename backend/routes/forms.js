const express = require('express');
const Form = require('../models/Form');
const Response = require('../models/Response');
const { authGuard } = require('../middleware/auth');
const router = express.Router();

router.post('/', authGuard, async (req, res) => {
  const form = new Form({ ...req.body, owner: req.user.id });
  await form.save();
  res.json(form);
});

router.get('/', authGuard, async (req, res) => {
  const forms = await Form.find({ owner: req.user.id });
  res.json(forms);
});

router.get('/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

router.put('/:id', authGuard, async (req, res) => {
  try {
    const updated = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.delete('/:id', authGuard, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    // Optional: Check if the user owns the form
    if (form.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    await Form.findByIdAndDelete(req.params.id);
    await Response.deleteMany({ formId: req.params.id }); // cleanup responses

    res.json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/summary/:formId',authGuard, async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    const responses = await Response.find({ formId: req.params.formId });

    const summary = form.questions.map((question) => {
      const qSummary = {
        question: question.text,
        type: question.type
      };

      if (question.type === 'text') {
        const answers = responses
          .map((resp) => {
            const match = resp.answers.find(
              (a) => a.question === question.text
            );
            return match?.answer;
          })
          .filter((a) => a !== undefined && a !== '');

        qSummary.answers = answers;
      } else {
        const counts = {};
        responses.forEach((resp) => {
          const match = resp.answers.find(
            (a) => a.question === question.text
          );
          const ans = match?.answer;

          if (Array.isArray(ans)) {
            ans.forEach((option) => {
              counts[option] = (counts[option] || 0) + 1;
            });
          } else if (typeof ans === 'string') {
            counts[ans] = (counts[ans] || 0) + 1;
          }
        });

        qSummary.counts = counts;
      }

      return qSummary;
    });
    console.log(summary);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating summary' });
  }
});


module.exports = router;
