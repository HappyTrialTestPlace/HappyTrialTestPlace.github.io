function createDescription(){
	const imageNumber = checkImage();
	console.log(imageNumber);
	if(imageNumber === "error"){
		return 0;
	}
	switch (imageNumber) {
		case 0:
			var shareDescription = infoList[0].name;
			break;
		case 1:
			var shareDescription = infoList[1].name;
			break;
		case 2:
			var shareDescription = infoList[2].name;
			break;
		case 3:
			var shareDescription = infoList[3].name;
			break;
		case 4:
			var shareDescription = infoList[4].name;
			break;
		case 5:
			var shareDescription = infoList[5].name;
			break;
		case 6:
			var shareDescription = infoList[6].name;
			break;
		case 7:
			var shareDescription = infoList[7].name;
			break;
		case 8:
			var shareDescription = infoList[8].name;
			break;
		case 9:
			var shareDescription = infoList[9].name;
			break;
		case 10:
			var shareDescription = infoList[10].name;
			break;
		case 11:
			var shareDescription = infoList[11].name;
			break;		
	}
	var shareTitle = '학과테스트 결과'
	const shareImageUrl = url + '/img/image/' + imageNumber + '.png';
	sendKakaoLink(shareTitle, shareDescription, shareImageUrl);
}

const copy = () => {
  const tmp = document.createElement('textarea');
  document.body.appendChild(tmp);
  tmp.value = url;
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}