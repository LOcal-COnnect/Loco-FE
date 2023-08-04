var host = ',,'

function storeJoin() {
    var storeId = $('#storeId').val()
    var storePw = $('#storePw').val()
    var storeEmail = $('#storeEmail').val()
    var phoneNum = $('#phoneNum').val()
    var address = $('#roadAddress').val()
    var addressDetail = $('#addressDetail').val()
    var storeName = $('#storeName').val()
    var storeNumber = $('#storeNumber').val()
    var businessNum = $('#businessNum').val()
    $.ajax({
        url: host + '/users/sellers/join',
        method: 'POST',
        data: JSON.stringify({
            userId: storeId,
            password: storePw,
            email: storeEmail,
            phone: phoneNum,
            storeName: storeName,
            storeNumber: storeNumber,
            address: address,
            addressDetail: addressDetail,
            businessNumber: businessNum,
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
            userId: userId,
            password: userPw,
            email: userEmail,
            username: userName,
            phone: userPhone,
            address: address,
            addressDetail: addressDetail,
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
    var userId = $('#userId').val()
    var password = $('#userPw').val()
    $.ajax({
        url: host + '/users/login',
        method: 'POST',
        data: JSON.stringify({
            userId: userId,
            password: password,
        }),
        success: function () {
            alert('로그인에 성공하였습니다.')
            window.location.href = 'index.html'
        },
        error: function () {
            alert('로그인에 실패하였습니다. 다시 시도하세요.')
        },
    })
}
