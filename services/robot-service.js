'use strict';
const express = require('express');
const router = express.Router();
const _ = require('underscore');
const robotHandler = require('./../model_handlers/robot-handler');
const jsonResponse = require('./../utils/json-response');
const responseCodes = require('./../utils/response-codes');
const errors = require('./../errors/errors');

router.post('/robot-directions', (req, res) => {
    if (!_.has(req.body, 'robot_start_location') || !_.has(req.body, 'robot_end_location')
		|| !_.has(req.body, 'robot_initial_direction')
		|| !_.has(req.body, 'robot_command_list')) {
        jsonResponse(res, responseCodes.BadRequest, errors.missingParameter(true), null);
        return;
    }
    robotHandler.getRobotDirections(req.body, (error, robotDirections) => {
        if(error){
            jsonResponse(res, responseCodes.InternalServer, error, null);
            return;
        }
        jsonResponse(res, responseCodes.OK, errors.noError(), robotDirections);
    });
});

module.exports = router;
