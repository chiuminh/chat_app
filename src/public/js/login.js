let loginForm = document.getElementById("login");
let registerForm = document.getElementById("register");
let forgotPasswordForm = document.getElementById("forgotPassword");
let btn = document.getElementById("btn");
let btnForgotPass = document.getElementById("btn-forgot-password");
let btnBack = document.getElementById("btn-back");

function openRegister() {
  btn.style.transform = "translateX(110px)";
  loginForm.style.transform = "translateX(-400px)";
  registerForm.style.transform = "translateX(0)";
  forgotPasswordForm.style.transform = "translateX(450px)";
  btnForgotPass.parentElement.classList.add("d-none");
  btn.parentElement.classList.remove("button-box-bottom");
  btnBack.parentElement.classList.add("d-none");
}

function openForgotPassword() {
  forgotPasswordForm.style.transform = "translateX(0)";
  registerForm.style.transform = "translateX(400px)";
  loginForm.style.transform = "translateX(-450px)";
  btnForgotPass.parentElement.classList.remove("d-none");
  btnBack.parentElement.classList.remove("d-none");
  btn.parentElement.classList.add("button-box-bottom");
}

function openLogin() {
  btn.style.transform = "translateX(0)";
  loginForm.style.transform = "translateX(0)";
  registerForm.style.transform = "translateX(400px)";
  forgotPasswordForm.style.transform = "translateX(450px)";
  btnForgotPass.parentElement.classList.add("d-none");
  btn.parentElement.classList.remove("button-box-bottom");
  btnBack.parentElement.classList.add("d-none");
}
