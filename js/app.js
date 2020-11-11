import jump from '../node_modules/jump.js/dist/jump.module.js';

sal({
    once: false
});

const navSlide = () => {
    const navBar = document.querySelector('.nav-btns');
    const burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
        navBar.classList.toggle('nav-active'); 
    }) ;
}

function init(){

    //Selectors
    const navBtns = document.querySelectorAll('.navBtn');
    const sections = document.querySelectorAll('section');
    const navBar = document.querySelector('.nav-btns');
    const mailBtn = document.querySelector('.section4__custom-btn');

    //OnScroll navBtns change
    const height = window.innerHeight-200;
    const resumeHeight = height * 2;
    const aboutHeight = height * 3;
    const contactHeight = height * 4;

    mailBtn.addEventListener('click', emailSent, false);

    navBtns.forEach((btn,index) => {
        btn.addEventListener('click', function() {
            jump(sections[index], {
                duration: 500
              });
            navBar.classList.remove('nav-active'); 
            changeBtn(this);
        });
    });

    function changeBtn(btn){
        navBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.toggle('active');
    }

    window.addEventListener('scroll', function(e) {
        var scroll = window.pageYOffset;

        if (scroll < height) {
            changeBtn(navBtns[0])
        } else if (scroll < resumeHeight) {
            changeBtn(navBtns[1])
        } else if (scroll < aboutHeight) {
            changeBtn(navBtns[2])
        } else if (scroll < contactHeight) {
            changeBtn(navBtns[3])
        }
    });
}

function emailSent(){
    const alertMsg = document.getElementById('alert');
    var company = document.forms['form']['company'].value;
    var message = document.forms['form']['message'].value;
    var data = new FormData();
    data.append('company', company);
    data.append('message', message);

    if (company=='' || message==''){
        alertMsg.innerHTML = "Fill in all the fields please";
    } else {
        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "./send-email.php");

        xhttp.onload = function() {
            if(this.response == "ok"){
                alertMsg.style.color = "rgb(0, 255, 0)";
                alertMsg.innerHTML = "Email sent!";
            } else {
                alert(this.response);
                alertMsg.style.color = "red";
                alertMsg.innerHTML = "Error sending email!";
            }
        }

        xhttp.send(data);
    }

    alertMsg.style.opacity = "1";
}

navSlide();
init();
