

export const sendError = ({ response, message ,status=400}) => {
	response.status(status).send({error:message,result:false});
};
export const sendResult = ({ response, message }) => {
	response.status(200).send(message);
};
