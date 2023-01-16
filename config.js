const using_click = true;        // true = id_button.click()    |   false = id_form.submit()
const id_user = 'user_name';     //id of username input text. For example : <input type="text" name="id_siap" id="user_name">
const id_pass = 'user_pass';     //id of password input. For Example : <input type="password" name="password" id="user_pass">
const id_form = 'loginform';     //id of form tag. For Example : <form action="#" method="post" id="loginform">
const id_button = 'login';       //id of login button. For Example : <button type="submit" class="btn btn-primary btn-block" id="login">Sign In</button>

const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';    //wss URL using btoa(). In this example : btoa("wss://auth.ulbi.ac.id/ws/whatsauth/qr");
const keyword = 'aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgw';  //whatsapp API with prefix keyword using btoa(). In this example : btoa("https://wa.me/628112000279?text=wh4t5auth0");

const interval = 30;     // qrcode change interval in second
const maxqrwait = 90;    // maximum qrcode display/ time out in second, usually = 3 x interval.
