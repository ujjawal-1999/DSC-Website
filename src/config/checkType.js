const path = require('path');

const checkType = (file,cb)=>{
	const allowedTypes = /jpeg|png|jpg|pdf/

	const extension = allowedTypes.test(path.extname(file.originalname.toLowerCase()));

	const mimeTypeCheck = allowedTypes.test(file.mimetype);
	if(mimeTypeCheck && extension)
			return cb(null,true);
	else
		return cb('error:Allowed Formats: jpeg/jpg/png/pdf');
}

module.exports = checkType;