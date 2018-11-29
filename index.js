var fs = require('fs');
var parse = require('csv-parse');

var csvData = '';
fs.createReadStream('./data.csv')
	.pipe(parse({ delimiter: ',' }))
	.on('data', function(csvrow) {
		csvData += takinglocations(csvrow['1']);
		csvData += ',';
		csvData += takinglocations(csvrow['0']);
		csvData += '\n';
	})
	.on('end', function() {
		//do something wiht csvData
		savingFiles(csvData);
	});
function takinglocations(e) {
	if (e.includes(':')) {
		let ee = e.split(':');
		return DMStoDD(ee[0], ee[1], ee[2]);
	} else {
		return '';
	}
}
function DMStoDD(deg, min, sec) {
	// Converting DMS ( Degrees / minutes / seconds ) to decimal format
	return parseInt(deg) + convert(min, 'min') + convert(sec, 'sec');
}

function convert(e, arg) {
	switch (arg) {
		case 'min':
			return parseInt(e) / 60;
			// console.log('min was hit');
			break;

		case 'sec':
			return parseInt(e) / 3600;
			// console.log('sec was hit');
			break;
	}
}
function savingFiles(data) {
	fs.writeFile('./Files/CSV.csv', data, function(err) {
		if (err) {
			return console.log(err);
		}

		console.log('The file was saved!');
	});
}
