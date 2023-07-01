"use strict";
const { verifyToken } = require("../helpers/index.js");
const { User } = require("../models/index");

const authn = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const payLoad = verifyToken(access_token);
        const foundUser = await User.findByPk(payLoad.id);
        req.user = {
            id: foundUser.id,
            username: foundUser.username,
            canteenName: foundUser.canteenName
        };
        next();
    } catch (error) {
        next(error)
    }
};
module.exports = authn;