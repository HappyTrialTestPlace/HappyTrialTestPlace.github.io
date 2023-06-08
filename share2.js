const url = 'https://youtu.be/PWk03ieUsDs';
const title = ' 나와 어울리는 디저트는?';
const hash = '%디저트_테스트 %호서대학교 ';

const tw = () => {
  let name = document.querySelector('.result').innerHTML;
  switch (name) {
    case '도넛':
    case '크루와상':
      name += '이에요! ';
      break;
    default:
      name += '예요! ';
  }
  window.open('https://twitter.com/intent/tweet?text='
    + title + '%0A' + '저는 ' + name + '' + hash + '%0A' + url,
    'twittersharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  return false;
}
const nv = () => {
  window.open('http://share.naver.com/web/shareView.nhn?url='
    + url + '&title=' + title,
    'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  return false;
}