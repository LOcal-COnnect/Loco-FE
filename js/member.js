var host = 'http://localhost:8080'

function storeJoin() {
    var storeId = $('#storeId').val()
    var storePw = $('#storePw').val()
    var storeEmail = $('#storeEmail').val()
    var storeNum = $('#storeNum').val()
    var address = $('#roadAddress').val()
    var addressDetail = $('#addressDetail').val()
    var storeSellerName = $('#storeSellerName').val()
    var storeName = $('#storeName').val()
    var sellerNumber = $('#sellerNumber').val()
    var businessNum = $('#businessNum').val()
    $.ajax({
        url: host + '/users/sellers/join',
        method: 'POST',
        data: JSON.stringify({
            'sellerId': storeId,
            'sellerPassword' : storePw,
            'sellerEmail': storeEmail,
            'sellerPhone': sellerNumber, //주인전화번호
            'sellerName': storeSellerName,
            'storeName': storeName,
            'storeTel': storeNum, //가게전화번호
            'storeAddress': address,
            'sellerDetailAddress': addressDetail,
            'businessNumber': businessNum,
        }),
        success: function () {
            alert('회원가입에 성공하였습니다.')
            window.location.href = 'login.html'
        },
        error: function () {
            alert('회원가입에 실패하였습니다. 다시 시도하세요.')
        },
    })
}

function memberJoin() {
    var userId = $('#userId').val()
    var userPw = $('#userPw').val()
    var userEmail = $('#userEmail').val()
    var userName = $('#userName').val()
    var userPhone = $('#userPhone').val()
    var address = $('#roadAddress').val()
    var addressDetail = $('#addressDetail').val()
    $.ajax({
        url: host + '/users/buyers/join',
        method: 'POST',
        data: JSON.stringify({
            'userId': userId,
            'userPassword': userPw,
            'userEmail': userEmail,
            'userName': userName,
            'userPhone': userPhone,
            'userAddress': address,
            'userDetailAddress': addressDetail,
        }),
        success: function () {
            alert('회원가입에 성공하였습니다.')
            window.location.href = 'login.html'
        },
        error: function () {
            alert('회원가입에 실패하였습니다. 다시 시도하세요.')
        },
    })
}

function login() {
    var userId = $('#userId').val();
    var password = $('#userPw').val();
    $.ajax({
        url: host + '/users/login',
        method: 'POST',
        data: JSON.stringify({
            'userId': userId,
            'userPassword': password,
        }),
        success: function (response) {
            localStorage.setItem('token', response);
            alert('로그인에 성공하였습니다.')
            window.location.href = 'main.html'
        },
        error: function () {
            alert('로그인에 실패하였습니다. 다시 시도하세요.')
        },
    })
}

function checkBusinessNum() {
    var businessNumber = $('#businessNum').val();
    $.ajax({
        url: host + '/users/business-number',
        method: 'POST',
        data: JSON.stringify({
            'businessNumber': businessNumber
        }),
        success: function(data) {
            alert('사업자 번호가 인증되었습니다.');
            // 사업자 번호 인증 성공 시 회원가입 버튼 활성화
            $('#joinButton').prop('disabled', false);
        },
        error: function() {
            alert('존재하지 않는 사업자 번호입니다. 사업자 번호를 확인해주세요.');
            // 사업자 번호 인증 실패 시 회원가입 버튼 비활성화 및 안내 메시지 표시
            $('#joinButton').prop('disabled', true);
        }
    });
}

function sendFindEmail(){
    var userEmail = $('#findPwEmail').val();
    $.ajax({
        url: host + '/users/password?email=' + userEmail,
        method: 'POST',
        success: function(data){
            alert('입력한 이메일로 임시 비밀번호가 전송되었습니다.');
            window.location.href='login.html';
        },
        error: function(){
            if(userEmail === '') {
                alert('이메일을 입력하세요');
            }else{
                alert('이메일을 다시 입력하세요');
            }
        }
    })
}