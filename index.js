const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
const connectDB = require('./config/dbConnection');
connectDB()
const Password = require('./passwordModel');
const port = 3000;


app.post('/generatePassword', async (req, res) => {
    try {
        const { rangeValue, selectedSwitches } = req.body;

        const chars = {
            numbers: '0123456789',
            upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowerCase: 'abcdefghijklmnopqrstuvwxyz',
            specialChars: '!@#$%^&*()-=_+[]{}|;:,.<>?/',
          };
        
          let allChars = '';
          let password = '';
        
          Object.keys(selectedSwitches).forEach((option) => {
            if (selectedSwitches[option]) {
                allChars += chars[option];
            }
        });
        
        for (let i = 0; i < rangeValue; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars.charAt(randomIndex);
        }

        console.log(password,'pass');

        if (password.length == rangeValue) {
            console.log(password,'pass');
            res.status(200).json({password})
        } else {
            res.status(404).json({message:'Cannot find password'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error generating password"});
    }
});

app.post('/savePassword', async (req, res) => {
    try {
        const  { name, password } = req.body;
        const existingPassword = await Password.findOne({ name });
        if (existingPassword) {
            return res.status(403).json({ message: 'Password with the same name already exists' });
        }
        const pass = new Password({
            name,
            password
        });
        const passSave = await pass.save();
        if (passSave) {
            res.status(200).json({message:'password saved'})
        } else {
            res.status(403).json({message:'password cannot be saved'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving password"});

    }
});

app.get('/getPassword' , async (req,res) => {
    try {
        const pass = await Password.find({});
        if (pass) {
            res.status(200).json({pass})
        } else {
            res.status(404).json({message:'Could not find password data'})
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting password"});
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})