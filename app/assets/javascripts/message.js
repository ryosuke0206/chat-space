$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
          <div class="message-info">
            <div class="message-info__name">
              ${message.user_name}
            </div>
            <div class="message-info__data">
              ${message.created_at}
            </div>
          </div>
          <div class="message-info__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } 
    else {
      var html =
      `<div class="message" data-message-id=${message.id}>
      <div class="message-info">
        <div class="message-info__name">
          ${message.user_name}
        </div>
        <div class="message-info__data">
          ${message.created_at}
        </div>
      </div>
      <div class="message-info__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
          </div>
        </div>`
      return html;
    };
  }
  $('.new_message').on('submit', function(e) {
    e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action'); 

    $.ajax({
      url: url, 
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('form')[0].reset();
      $(".form__submit").removeAttr("disabled");
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    })
    .fail(function(massege){
      alert('メッセージを入力してください');
      $(".form__submit").removeAttr("disabled");
    })
})
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 

      $.ajax({ 
        url: "api/messages",
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
      })
      .done(function (messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)

          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
  });
