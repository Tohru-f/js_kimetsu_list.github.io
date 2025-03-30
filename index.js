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
    const topTag = document.querySelector('#top');

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

export { selectedView }