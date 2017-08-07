'use strict';
const _ = require('underscore');

const getRobotDirections = (robotDetails, done) => {
	let x = robotDetails.robot_start_location;
	let y = robotDetails.robot_end_location;
	let initialDirection = robotDetails.robot_initial_direction;
	let commands = robotDetails.robot_command_list;
	
	_.each(commands, (command) => {
		if(initialDirection == 'F') {
			if(command == 'F') {
				y++;
			} else if(command == 'L') {
				x--;
			} else {
				x++;
			}
			
		} else if(initialDirection == 'L') {
			if(command == 'F') {
				x--;
			} else if(command == 'L') {
				y--;
			} else {
				y++;
			}
			
		} else if(initialDirection == 'R') {
			if(command == 'F') {
				x++;
			} else if(command == 'L') {
				y++;
			} else {
				y--;
			}
			
		}		
	});
	if(x < 0 || x > 10 || y  < 0 || y > 10){
		done("The Robots new location could not be determined", null);
	} else {
		
		const response = {
			description : "The Robots new location is", x,y
		}
		done(null, response);
	}
};

module.exports = {
	getRobotDirections: getRobotDirections	
}

