const express = require('express');
const router = express.Router();
const OnboardingTask = require('../../models/tasks')

// Create a new onboarding task
router.post('/', (req, res) => {
  const newOnboardingTask = new OnboardingTask({
    employee_id: req.body.employee_id,
    task_id: req.body.task_id,
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    deadline: req.body.deadline,
    completion_date: req.body.completion_date,
    status: req.body.status,
    assigned_by: req.body.assigned_by,
    assigned_to: req.body.assigned_to,
    comments: req.body.comments,
    documents: req.body.documents,
    onboarding_period: req.body.onboarding_period,
    onboarding_status: req.body.onboarding_status
  });
  newOnboardingTask.save()
    .then(onboardingTask => res.json(onboardingTask))
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

//Update task status
router.patch('/:id', (req, res) => {
  OnboardingTask.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})
    .then(onboardingTask => res.json(onboardingTask))
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

// Retrieve the progress of a new hire's onboarding
router.get('/:employee_id', (req, res) => {
  OnboardingTask.find({ employee_id: req.params.employee_id })
    .then(onboardingTask => res.json(onboardingTask))
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

//Retrieving the list of onboarding process
router.get('/', (req, res) => {
  OnboardingTask.find({ onboarding_status: req.query.status || { $exists: true } })
    .then(onboardingTasks => res.json(onboardingTasks))
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

//Remove an onboarding process
router.delete('/:id', (req, res) => {
  OnboardingTask.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Onboarding task removed successfully' }))
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

module.exports = router;