async function callCharacters(category) {
  const res = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${category}.json`);
  const Characters = await res.json();
  return Characters;
}

const selectedView = async (category) => {

  try {

    // 非同期でカテゴリー別にJSONデータを取得
    // let designatedCharacters;
    // designatedCharacters = await callCharacters(category);
    const designatedCharacters = await callCharacters(category);

    // フォーム下のdivタグを取得。
    const topTag = document.getElementById('top');

    // キャラクターの数だけDOM作成の処理を繰り返す
    for(let i = 0; i < designatedCharacters.length; i++) {

      // 親DOMを作成、後でdivタグの子要素として加える
      const ulTag = document.createElement('ul');

      // キャラクターの名前を取得してliタグのテキストに挿入、ulタグの子要素として加える
      const nameTag = document.createElement('li');
      nameTag.textContent = designatedCharacters[i].name;
      ulTag.appendChild(nameTag);

      // キャラクターのカテゴリーを取得してliタグのテキストに挿入、ulタグの子要素として加える
      const categoryTag = document.createElement('li');
      categoryTag.textContent = designatedCharacters[i].category;
      ulTag.appendChild(categoryTag);

      // キャラクターの画像URLを取得して絶対パスと併せて完全なパスとし、liタグ下にimgタグを作り、必要情報を加える
      const parentTag = document.createElement('li');
      const imgTag = document.createElement('img');
      imgTag.src = 'https://ihatov08.github.io' + designatedCharacters[i].image;
      imgTag.alt = designatedCharacters[i].name;
      imgTag.width = 200;
      imgTag.height = 200;
      parentTag.appendChild(imgTag);
      ulTag.appendChild(parentTag);

      // 最終的にulタグへ名前、カテゴリー、画像を子要素として加えたらulタグをdivタグへ子要素として加える
      topTag.appendChild(ulTag);
    }
  } catch (e){
    console.error(e);
  }
}

const setEventListener = function(elements) {
  // 繰り返し処理で全てのラジオボタンにイベントハンドラーを設定
  for(let i = 0; i<elements.length; i++) {
    elements[i].addEventListener("click", (event) => {
      // キャラクター情報が登録されたulタグを全て削除
      const ulTags = document.querySelectorAll('ul');
      for(let i = 0; i < ulTags.length; i++) {
        ulTags[i].remove();
      }
      // フォーム下のdivタグを取得。
      const topTag = document.getElementById('top');
      // カテゴリー選択用のフォームを非表示にする
      const form = document.querySelector('form');
      form.classList.add('invisible');

      // Loading画面を設定する
      const loading = document.createElement('div');
      loading.textContent = "Loading...";
      loading.classList.add('loading');
      topTag.appendChild(loading);

      // 2秒後にLoading画面を削除。フォームを再表示して、選択したキャラクター情報を表示する
      // event.targetでイベントが発生したDOM要素を取得する
      setTimeout(() => {
        loading.remove();
        form.classList.remove('invisible');
        selectedView(event.target.value);
      }, 2000);
    });
  }
}

export { selectedView, setEventListener }