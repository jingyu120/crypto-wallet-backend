const UserModel = require("../models/Users");

export const GetAllUsers = (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.state(500).json(err);
    } else {
      res.state(200).json(result);
    }
  });
};

export const CreateNewUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
};

export const SignInGoogle = async (req, res) => {
  UserModel.findOne({ email: req.body.email }, (error, result) => {
    if (error) {
      res.status(500).json(result);
    } else {
      if (result) {
        res.status(200).json(result);
      } else {
        const newUser = new UserModel(req.body).save();
        res.status(200).json(newUser);
      }
    }
  });
};
