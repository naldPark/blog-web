const fs = require('fs');
// please don't use console.log  
if (typeof crypto == 'undefined') {
	crypto = require('crypto').webcrypto;
}

async function encrypt(req) { // here to encrypt  main.ts to decrypt
	const dataType = req.headersIn['DataType'];
	req.headersOut['Content-Type'] = 'text/plain';
	const text = fs.readFileSync('/usr/share/nginx/html/env/config.json');
	var base64 = '';
	if (dataType === 'crypto') {
		const buffer = Buffer.from("roYS3dhGbhoA7xEFwpZfomWgyMHdCb9vi73cdVroOOk=", "base64");
		const eKey = await crypto.subtle.importKey("raw", buffer, { name: "AES-CBC", }, false, ["encrypt", "decrypt"]);
		const iv = new TextEncoder().encode('nald super duper'); // write anything to set 16bytes 
		const result = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, eKey, text);
		const str = String.fromCharCode.apply(null, new Uint16Array(result));
		base64 = Buffer.from(result).toString("base64");
		req.headersOut['DataType'] = 'crypto';
		req.return(200, base64);
	} else {
		base64 = Buffer.from(text).toString("base64");
		req.headersOut['DataType'] = 'base64';
		req.return(200, base64);
	}
}

export default { encrypt };