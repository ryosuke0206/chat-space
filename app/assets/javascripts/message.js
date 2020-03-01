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
          messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 5000);
    });
  