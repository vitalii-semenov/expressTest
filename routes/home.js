const {Router} = require('express');
const Employee = require('../models/employee');
const auth = require('../middleware/auth');
const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    const {name, address, birth, position, salary} = req.body;
    const employee = new Employee({name, address, birth, position, salary});
    await employee.save();
    res.status(200).send({'message': 'Successfully added'});

  } catch (e) {
    res.status(400).send('Error');
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    Employee.find({}, (err, users) => {
      let staff = [];

      users.forEach((user, id) => {
        staff[id] = user;
      });

      res.status(200).send(staff);
    });

  } catch (e) {
    res.status(400).send('Error');
  }
});

router.post('/delete', auth, async (req, res) => {
  try {
    const {_id} = req.body;
    await Employee.findOneAndDelete({_id});
    res.status(200).send({'message': 'Successfully deleted'});

  } catch (e) {
    res.status(400).send('Error');
  }
});

router.post('/edit', auth, async (req, res) => {
  try {
    const {_id, name, address, birth, position, salary} = req.body;
    await Employee.findOneAndUpdate({_id}, {name, address, birth, position, salary});
    res.status(200).send({'message': 'Successfully edited'});

  } catch (e) {
    res.status(400).send('Error');
  }
});

module.exports = router;
