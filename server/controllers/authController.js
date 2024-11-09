import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ name, email, password: hashedPassword });
        res.json({ status: 'ok', user });
    } catch (err) {
        res.status(500).json({ success:false,message:err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: 'error', user: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ status: 'error', user: false });
    }

    const token = jwt.sign({ name: user.name, email: user.email }, 'secret123');
    res.json({ status: 'ok', user: token });
};
