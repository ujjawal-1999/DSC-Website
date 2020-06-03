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

const checkProfileImageType = (file,cb)=>{
	const allowedTypes = /jpeg|png|jpg/

	const extension = allowedTypes.test(path.extname(file.originalname.toLowerCase()));

	const mimeType = allowedTypes.test(file.mimetype);
	if(mimeType && extension )
		return cb(null,true);
	else	
		return cb('Error:Allowed Formats: jpeg/jpg/png');
}


const checkResumeFileType = (file,cb)=>{
	const allowedTypes = /pdf|doc|docx/

	const extension = allowedTypes.test(path.extname(file.originalname.toLowerCase()));

	const mimeType = allowedTypes.test(file.mimetype);
	if(mimeType && extension )
		return cb(null,true);
	else	
		return cb('Error:Allowed Formats: pdf|doc|docx');
}

module.exports = {
	checkType,
	checkProfileImageType,
	checkResumeFileType
}