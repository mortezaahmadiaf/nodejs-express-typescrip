const codeGenerator = ():number => {
	let code:number = Math.round(Math.random() * (9990 - 1000) + 1000);
	return code;
};
export default codeGenerator;
