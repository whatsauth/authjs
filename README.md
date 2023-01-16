# AuthJS : JS Client for WhatsAuth 

Use this js for Two-Factor Authentication (2FA) WhatsAuth Application Login.
This library using [englishextra/qrjs2](https://github.com/englishextra/qrjs2) to generate QR.

## How to use

1. Copy whatsauth.js and qrjs2.js to your asset public static folder. For example : assets/authjs folder.
2. add this div and p tag into your login section page in your login html page. For examle : inside login div/section before form

    ```html
    <div id="whatsauthqr"><div></div></div>
    <p id="whatsauthcounter">hi</p>
    ```

3. Also add this script in the end your body login html page, for example : before </body> tag. Please modif const variable based on your html form id.
   For Example, we have form login :

   ```html
   <form action="#" method="post" id="loginform">
    <input type="text" name="id_siap" id="user_name">
    <input type="password" name="password" id="user_pass">
    <button type="submit" id="login">Sign In</button>
   </form>
   ```

   Option 1 : Declare the const variable before calling qrjs2 and whatsauth library.

   ```html
    <script>
    const using_click = true;        // true = id_button.click()    |   false = id_form.submit()
    const id_user = 'user_name';     //id of username input text. For example : <input type="text" name="id_siap" id="user_name">
    const id_pass = 'user_pass';     //id of password input. For Example : <input type="password" name="password" id="user_pass">
    const id_form = 'loginform';     //id of form tag. For Example : <form action="#" method="post" id="loginform">
    const id_button = 'login';       //id of login button. For Example : <button type="submit" class="btn btn-primary btn-block" id="login">Sign In</button>

    const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';    //wss URL using btoa(). In this example : btoa("wss://auth.ulbi.ac.id/ws/whatsauth/qr");
    const keyword = 'aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgw';  //whatsapp API with prefix keyword using btoa(). In this example : btoa("https://wa.me/628112000279?text=wh4t5auth0");

    const interval = 30;     // qrcode change interval in second
    const maxqrwait = 90;    // maximum qrcode display/ time out in second, usually = 3 x interval.
    </script>
    <script src="assets/authjs/qrjs2.js"></script>
    <script src="assets/authjs/whatsauth.js"></script>
   ```

   Option 2 : Just modif and use config.js

   ```html
   <script src="assets/authjs/config.js"></script>
   <script src="assets/authjs/qrjs2.js"></script>
   <script src="assets/authjs/whatsauth.js"></script>
   ```

4. Edit CORS Config, add your apps domain in your whatsauth websocket server.
