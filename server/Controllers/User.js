import User from "../Models/User.js";
import bcrypt from "bcrypt";

export async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (await User.findOne({ username })) {
      return res
        .status(400)
        .send({ error: "User with this username already exist" });
    }
    if (password.length < 8) {
      return res.status(400).send({ error: "Password is too short" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.send({ success: "User created" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// app.post("/api/add-user", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (await User.findOne({ username })) {
//       return res
//         .status(400)
//         .send({ error: "User with this username already exist" });
//     }
//     if (password.length < 8) {
//       return res.status(400).send({ error: "Password is too short" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       role: "admin",
//     });
//     await newUser.save();
//     res.send({ success: "User created" });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
