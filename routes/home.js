const {Router} = require('express')
const jwt = require('jsonwebtoken')
const Employee = require('../models/employee')
const router = Router()

router.post('/add', async (req, res) => {
  try {
    const {token} = req.body;

    const candidate = await User.findOne({email});
    if (candidate) {
      const areSame = bcrypt.compare(password, candidate.password);
      if (areSame) {
        const token = jwt.sign({_id: candidate._id.toString()}, 'test');
        await User.findOneAndUpdate({email}, {token: token});
        res.status(200).send({token})
      }
    } else {
      res.status(400).send({"message": "is not registered"})
    }

  } catch (e) {
    res.status(400).send('Error')
  }
})

router.post('/register', async (req, res) => {
  try {
    const {login, password, email} = req.body;
    console.log('req', req.body);
    const candidate = await User.findOne({email});
    if (candidate) {
      res.status(400).send({"message": 'Successfully Registered'})
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({login, password: hashPass, email});
      await user.save();
      res.status(200).send({"message": 'Successfully Registered'})
    }
  } catch (e) {
    res.status(200).send('Error')
  }

})

module.exports = router