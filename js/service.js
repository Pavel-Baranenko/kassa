const BASE_URL = "https://bot.multikassa.ae/api/login";

const postQuery = async (data, action) => {
	let form_data = new FormData();
	form_data.append("action", action);

	for (var key in data) {
		form_data.append(key, data[key]);
	}

	const response = await axios.post(`${BASE_URL}`, form_data);
	if (response.data.status === "error") throw response.data;
	return response;
};

/*-----------------------------------------API QUERIES-----------------------------------------*/
const postReg = async ({ phone, password, username }) => {
	return await postQuery({ phone, password, username }, "reg");
};

const postCheckcode = async ({ phone, code }) => {
	return await postQuery({ phone, code }, "checkcode");
};

const postAuth = async ({ phone, password }) => {
	return await postQuery({ phone, password }, "auth");
};

const postLogout = async ({ phone }) => {
	return await postQuery({ phone }, "logout");
};

const postReset = async ({ phone }) => {
	return await postQuery({ phone }, "reset");
};

const postCheckresetcode = async ({ phone, code }) => {
	return await postQuery({ phone, code }, "checkresetcode");
};

const postSetpass = async ({ phone, password }) => {
	return await postQuery({ phone, password }, "setpass");
};

const postSetuserphone = async ({ phone, password }) => {
	return await postQuery({ phone, password }, "setuserphone");
};
