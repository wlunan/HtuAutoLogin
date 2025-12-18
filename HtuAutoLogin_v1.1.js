// ==UserScript==
// @name        河南师范大学（HTU）校园网自动登录
// @namespace   https://github.com/wlunan/HtuAutoLogin
// @match       http://10.101.2.194:6060/*
// @version     1.4
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @author      lunan
// @description 河南师范大学校园网自动登录，适用于公共区域的学生登录界面
// ==/UserScript==

$(document).ready(function() {
    // 获取存储的账号和密码
    var username = GM_getValue("username", "");
    var password = GM_getValue("password", "");

    var formHtml = `
    <div id="loginForm" style="position: fixed; top: 20%; left: 20%; transform: translateX(-50%); background: white; padding: 20px; border: 1px solid #ccc; z-index: 9999; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h3>请输入您的账号和密码</h3><br>
        <h3>第一次运行需要输入你的校园网账户和密码</h3>
        <h3>提交后1.5秒后自动登录提交</h3><br>
        <label for="usernameInput">账号:</label>
        <input type="text" id="usernameInput" value="" autocomplete="no"><br><br>
        <label for="passwordInput">密码:</label>
        <input type="password" id="passwordInput" value="" autocomplete="no"><br><br>
        <button id="saveCredentials">保存并提交</button>
        <button id="stop">停止自动运行（更新账户密码用）</button>
    </div>
    `;
    $('body').append(formHtml);

    $('#stop').click(function(){
        GM_deleteValue("username");
        GM_deleteValue("password");
        alert("已停止，可以重新输入账户密码");
        console.log('停止运行');
    })

    if (!username || !password) {
        // 点击保存按钮时，保存用户名和密码
        $('#saveCredentials').click(function() {
            // 获取用户输入的账号和密码
            username = $('#usernameInput').val();
            password = $('#passwordInput').val();

            console.log('输入的账号: ', username);  // 调试账号输入
            console.log('输入的密码: ', password);  // 调试密码输入

            // 如果用户名或密码为空，则提示用户
            if (!username || !password) {
                alert("请输入有效的用户名和密码！");
                return;
            }

            // 保存用户输入的用户名和密码到浏览器的本地存储
            GM_setValue("username", username);
            GM_setValue("password", password);

            // 执行登录操作
            loginCampusNetwork(username, password);
        });
    } else {
        // 如果已有用户名和密码，则直接登录
        loginCampusNetwork(username, password);
    }
});

// 登录校园网
function loginCampusNetwork(username, password) {
    if (document.title == '河南师范大学校园网登录') {
        setTimeout(function() {
            // 使用 jQuery 设置用户名和密码
            $("input[name='userName']").val(username);
            $("input[name='password']").val(password);

            // 获取按钮元素并模拟点击提交
            $("#checkButton").click();  // 模拟点击登录按钮

            // 如果需要手动触发表单提交，可以使用下面的代码
            // $('#loginForm').submit();
        }, 1500);  // 设置等待时间
    }
}