export function generateUniqueId() {
	const timestamp = new Date().getTime().toString().slice(-6);
	const randomNum = Math.floor(Math.random() * 90) + 10;
	return parseInt(timestamp + randomNum);
}

console.log('result', generateUniqueId());

