# WAuthJS : Web Socket Authentication using Vanilla JS for WhatsAuth

Use this js for Two-Factor Authentication (2FA) WhatsAuth Application Login.
This library using [englishextra/qrjs2](https://github.com/englishextra/qrjs2) to generate QR.

## How to use

1. Copy wauth.js to your asset public static folder. For example : assets/wauthjs folder.
2. add this div and p tag into your login section page in your login html page. For examle : inside login div/section before form

    ```html
    <div id="whatsauthqr"><div></div></div>
    <p id="whatsauthcounter">hi</p>
    ```

3. Check your login form html tag. Please add id in form, input, and button tag.
   For Example, we have form login :

   ```html
   <form action="#" method="post" id="loginform">
    <input type="text" name="id_siap" id="user_name">
    <input type="password" name="password" id="user_pass">
    <button type="submit" id="login">Sign In</button>
   </form>
   ```

   Edit const declaration in wauthjs.js according to id in login form.

   ```js
    const using_click = true;        // true = id_button.click()    |   false = id_form.submit()
    const id_user = 'user_name';     //id of username input text. For example : <input type="text" name="id_siap" id="user_name">
    const id_pass = 'user_pass';     //id of password input. For Example : <input type="password" name="password" id="user_pass">
    const id_form = 'loginform';     //id of form tag. For Example : <form action="#" method="post" id="loginform">
    const id_button = 'login';       //id of login button. For Example : <button type="submit" class="btn btn-primary btn-block" id="login">Sign In</button>

    const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';    //wss URL using btoa(). In this example : btoa("wss://auth.ulbi.ac.id/ws/whatsauth/qr");
    const keyword = 'aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgw';  //whatsapp API with prefix keyword using btoa(). In this example : btoa("https://wa.me/628112000279?text=wh4t5auth0");

    const interval = 30;     // qrcode change interval in second
    const maxqrwait = 90;    // maximum qrcode display/ time out in second, usually = 3 x interval.
   ```

   Add whatsauth.js script in the end your body login html page, for example : before </body> tag.

   ```html
   <script src="assets/wauthjs/wauthjs.js"></script>
   ```

4. Edit CORS Config, add your apps domain in your whatsauth websocket server.
