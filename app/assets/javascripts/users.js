$(function() {
  // 文字が1文字以上の時に発火するHTML
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    // 入力内容をjsとして変換?
    // チャットメンバーの下に検索結果が表示されるのでセレクタはuser-search-resultにする
    $("#user-search-result").append(html);
    
  }

  // 文字が0文字の時に発火するHTML
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    // 入力内容をjsとして変換?
    // チャットメンバーの下に検索結果が表示されるのでセレクタはuser-search-resultにする
    $("#user-search-result").append(html);
  }

  // addDeleteUserの定義
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
    
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  // addmemberの定義
  // ユーザidをコントローラー側にパラメーターとして送る記述
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }


  // 1文字打つたびに内容が表示される
  // チャットメンバーの下に検索結果が表示されるのでセレクタはuser-search-resultにする
  $("#user-search-field").on("keyup", function() {
    
    // チャットメンバーに入力した内容を取得
    let input = $("#user-search-field").val();
   
    // users_controller.rbに送信する内容を設定
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    // 非同期通信成功時
      // index.json.jbuilderのデータをusersで受け取る
      .done(function(users) {
        
        // チャットメンバーの入力後の中身を空にする
        // チャットメンバーの下に検索結果が表示されるのでセレクタはuser-search-resultにする
        $("#user-search-result").empty();
        // 入力する文字数が1文字以上の時
        if (users.length !== 0) {
          users.forEach(function(user) {
            // addUser(user);を発火
            addUser(user);
          });
          // 入力した文字が0文字の場合
        } else if (input.length == 0) {
          return false;
        } else {
          // addNoUser();を発火
          addNoUser();
        }
          
      })
      // 非同期通信失敗
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  // 追加ボタンを押した際の処理
  // $(document).onでhtmlの情報を取得(appendさせた情報を取得)
  // .chat-group-user__btn--add(追記ボタン)を押すと88行目以降が発火
  $(document).on("click", ".chat-group-user__btn--add", function() {
  
    // 追加ボタンの対象のユーザー情報を変数userNameに代入
    //  メンバーを追加に入力した内容をattrの内容を取得して変数に代入
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");

    $(this)
    // .parent()を使うことでthisの親要素chat-group-user clearfixを取得
     
      .parent()
      // 検索結果からremoveメソッドを使い内容(chat-group-user clearfix)を削除
      .remove();

    // メンバーの追加(function addDeleteUser(name, id) の呼び出し)
    addDeleteUser(userName, userId);
    // メンバーの追加(function addMember(userId)の呼び出し)
    addMember(userId);

  });
  // チャットメンバーに追加したメンバーを削除する
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});