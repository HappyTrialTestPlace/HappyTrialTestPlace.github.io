const header = document.getElementById('header');
const footer = document.getElementById('footer');

const wrap = document.getElementById('wrap');
const qna = document.getElementById('qna');
const u_name = document.querySelector('input[type=text]');

const tabletMQL = window.matchMedia('all and (min-width: 768px)');
const pcMQL = window.matchMedia('all and (min-width: 1024px)');

//질문
const ENDPOINT = 12;
//배열
const select = [];
let qIdx = -1;

const calcScore = () => {
	var pointArray = [
		{ name: '1', value: 0, key: 0 },
		{ name: '2', value: 0, key: 1 },
		{ name: '3', value: 0, key: 2 },
		{ name: '4', value: 0, key: 3 },
		{ name: '5', value: 0, key: 4 },
		{ name: '6', value: 0, key: 5 },
		{ name: '7', value: 0, key: 6 },
		{ name: '8', value: 0, key: 7 },
		{ name: '9', value: 0, key: 8 },
		{ name: '10', value: 0, key: 9 },
		{ name: '11', value: 0, key: 10 },
		{ name: '12', value: 0, key: 11 },
	];

	for (let i = 0; i < ENDPOINT; i++) {
		var target = qnaList[i].a[select[i]];
		for (let j = 0; j < target.type.length; j++) {
			for (let k = 0; k < pointArray.length; k++) {
				if (target.type[j] === pointArray[k].name) {
					pointArray[k].value = pointArray[k].value + 1;
				}
			}
		}
	}

	let resultArray = pointArray.sort(function (a, b) {
		if (a.value > b.value) {
			return -1;
		}
		if (a.value < b.value) {
			return 1;
		}
		return 0;
	});
	console.log('결과 : ', resultArray);
	let resultword = resultArray[0].key;
	return resultword;
};

const goResult = () => {
	//pc
	if (pcMQL.matches) {
		
		wrap.style.marginTop = '150px';
	
	} else if (tabletMQL.matches) {
		
		wrap.style.marginTop = '115px';
	}

	const result = document.getElementById('result');
	const point = calcScore(); 

	const pTitle = document.querySelector('.p');
	pTitle.innerHTML = '당신의 결과는 ...';

	const img_url = 'img/image-' + point + '.png';

	const res_img = document.createElement('img');
	res_img.src = img_url; 
	res_img.alt = point; 
	res_img.title = infoList[point].name; 



	const res_img_div = document.querySelector('.art');
	res_img_div.appendChild(res_img);

	const animal = document.querySelector('.result');
	animal.innerHTML = infoList[point].name;

	
	const desc = document.querySelector('.res');
	desc.innerHTML = infoList[point].desc;

	
	setTimeout(() => {
		header.style.display = 'none';
		footer.style.display = 'block';
		result.style.display = 'block';
		header.style.animation = 'fade-in 0.3s forwards';
		footer.style.animation = 'fade-in 0.3s forwards';
		result.style.animation = 'going-up 0.5s, ' + 'fade-in 0.5s forwards';
	}, 600);
};

const end = () => {
	qna.style.animation = '';
	
	const interval = setInterval(() => {
		qna.style.opacity -= 0.1;
		qna.style.transform = 'translateY(-1px)';
	}, 50);

	
	setTimeout(() => clearTimeout(interval), 500);
	
	setTimeout(() => {
		qna.style.display = 'none'
		goResult();
	}, 500);
};


const addAnswer = (answerTxt, idx) => {
	const answer = document.createElement('button');
	answer.className += 'a box';
	answer.innerHTML = answerTxt;

	answer.addEventListener('click', () => {

		const parent = answer.parentNode;
		const children = parent.childNodes;
		for (let i in children) {
			children[i].disabled = true;
		}

		
		parent.classList.add('fade-out-5-4');
		setTimeout(() => {
			select[qIdx] = idx;
			a.innerHTML = '';
			parent.classList.remove('fade-out-5-4');
			goNext();
		}, 800);
	});

	setTimeout(
		() => (answer.style.animation = 'going-down 0.25s forwards, fade-in 0.25s forwards'), 50
	);
	const a = document.querySelector('.answer');
	a.appendChild(answer);
};

const goNext = () => {
	if (qIdx++ === qnaList.length - 1) {
		//end
		end();
		return;
	}

	const status = document.querySelector('.status');
	status.style.width = (100/ENDPOINT) * (qIdx + 1) + '%';

	const qNum = qnaList[qIdx];
	const q = document.querySelector('.q');
	q.innerHTML = qNum.q;


	qna.style.animation =
		'fade-in 0.3s ease-in-out 0.4s forwards, ' + 'going-down 0.3s ease-in-out 0.4s forwards';

	setTimeout(() => {
	
		const endIdx = qNum.a.length - 1;
		for (let i in qNum.a) {
			addAnswer(qNum.a[i].answer, i);
		}
		qna.style.opacity = 1;
	}, 700);
};

const begin = () => {
	const main = document.getElementById('main');
	footer.style.animation = 'going-down 0.4s forwards, ' + 'fade-out 0.4s forwards';
	setTimeout(
		() =>
			(main.style.animation =
				'going-up 0.4s ease-in-out forwards, ' + 'fade-out 0.4s ease-in-out forwards'),
		500
	);
	setTimeout(() => {
		window.scrollTo(0,0);
		footer.style.display = 'none';
		main.style.display = 'none';
		qna.style.display = 'block';
		if (pcMQL.matches) {
			
			wrap.style.marginTop = '50px';
		} else if (tabletMQL.matches) {
			
			wrap.style.marginTop = '30px';
		}
		goNext();
	}, 1000);
};

const load = () => {
	const start_btn = document.querySelector('.start');

	start_btn.addEventListener('click', () => {
		try {
			start_btn.disabled = true;
			begin();
		} catch (err) {
			
		}
	});
};

window.onload = load();
