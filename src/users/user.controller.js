const router = require('express').Router();
const usersService = require('./user.service');

router.get("/", async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;