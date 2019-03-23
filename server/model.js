const mongoose = require('mongoose');
const {DB_URL, DB_OPTION} =  require('../config/dbConfig');
mongoose.connect(DB_URL, DB_OPTION);

const models = {
	user: {
		'user': { type: String, 'require': true },
		'pwd': { type: String, 'require': true },
		'type': { 'type': String, 'require': true },
		//头像
		'avatar': { 'type': String },
		// 简介
		'desc': { 'type': String },
		'title': { 'type': String },
	},
	chat: {
		'chatid':{'type':String, require:true},
		'from':{'type':String, require:true},
		'to':{'type':String, require:true},
		'read':{'type':String, require:false},
		'content':{'type':String, require:true, default: ''},
		'create_time':{'type':Number, default: ''},

	}
}

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function (name) {
		return mongoose.model(name)
	}
}


