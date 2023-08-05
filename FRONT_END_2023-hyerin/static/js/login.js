function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

function onSubmitLogin(){

    $.ajax({
        type: 'POST',
        url: 'ppt',
        contentType: 'application/json',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
          },
        data: JSON.stringify({username,password

        }),
        success : function(data){"로그인 성공"

        },
        error: function(request, status, error){"로그인 실패"

        }
    })
}

function onSubmitLogin_cbv(){
    $("#form_submit").trigger("click")
}
