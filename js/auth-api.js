const $wrap = $(".user__form");

const $reg = $(".reg");
const $regForm = $reg.find("form");
const $regErrors = $reg.find(".errors");

const $checkcode = $(".code__form");
const $checkcodeForm = $checkcode.find("form");
const $checkcodeErrors = $checkcode.find(".errors");

var phone = null;
var password = null;
var action = null; // current action (for checkcode form)

/*--------------------------------------------------REG--------------------------------------------------*/

$regForm.on("submit", async (e) => {
	e.preventDefault();
	let data = $regForm.serializeArray().reduce((arr, inp) => ({ ...arr, [inp.name]: inp.value }), {});

	if (data.password !== data.password2) return $regErrors.text("Пароли не совпадают");

	delete data.password2;
	try {
		const response = await postReg(data);
		console.log(response);

		phone = data.phone;
		password = data.password;
		action = "reg";

		$reg.css("display", "none");
		$checkcode.addClass("active");
	} catch (err) {
		return $regErrors.text(err.text);
	}
});

/*--------------------------------------------------AUTH--------------------------------------------------*/
const $auth = $(".sing");
const $authForm = $auth.find("form");
const $authErrors = $auth.find(".errors");

const auth = async ({ phone, password }) => {
	try {
		const response = await postAuth({ phone, password });
		console.log(response);

		localStorage.setItem("phone", phone);
	} catch (err) {
		return $authErrors.text(err.data.text);
	}
};

$authForm.on("submit", async (e) => {
	e.preventDefault();
	let data = $authForm.serializeArray().reduce((arr, inp) => ({ ...arr, [inp.name]: inp.value }), {});
	console.log(data);
	await auth(data);
});

/*--------------------------------------------------LOGOUT--------------------------------------------------*/

$("#logout").click(async () => {
	const phone = localStorage.getItem("phone");
	await postLogout({ phone });
});

/*--------------------------------------------------RESET--------------------------------------------------*/
const $reset = $(".reset");
const $resetForm = $reset.find("form");
const $resetErrors = $reset.find(".errors");

// Здесь вызови 2 onclick для кнопок сброса пароля и номера. При клике открывай попап reset и задавай action либо reset-password, либо reset-phone

$reset.on("submit", async (e) => {
	e.preventDefault();
	let data = $reset.serializeArray().reduce((arr, inp) => ({ ...arr, [inp.name]: inp.value }), {});

	try {
		const response = await postReset(data);
		console.log(response);

		phone = data.phone;
		action = "reset";

		$reset.css("display", "none");
		$checkcode.addClass("active");
	} catch (err) {
		return $resetErrors.text(err.text);
	}
});

/*--------------------------------------------------CHECKCODES--------------------------------------------------*/
$checkcodeForm.on("submit", async (e) => {
	e.preventDefault();

	let data = $checkcodeForm.serializeArray().reduce((arr, inp) => ({ ...arr, [inp.name]: inp.value }), {});
	try {
		let response;
		if (action === "reg") await postCheckcode({ ...data, phone }).then(async () => await auth({ phone, password }));
		else if (action === "reset-password") {
			response = await postCheckresetcode({ ...data, phone }).then(async () => await postSetpass({ phone, password }));
		} else if (action === "reset-phone") {
			response = await postCheckresetcode({ ...data, phone }).then(async () => await postSetuserphone({ phone, password }));
		}
		console.log(response);
	} catch (err) {
		return $checkcodeErrors.text(err.text);
	} finally {
		action = null;
		$checkcode.removeClass("active");
		$wrap.removeClass("active");
	}
});
