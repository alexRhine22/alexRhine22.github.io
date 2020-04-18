var accordion = document.getElementsByClassName('accordion');

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.getElementsByTagName('i')[0].classList.toggle('active');
        var panel = this.nextElementSibling;
        this.classList.toggle('active');
        panel.classList.toggle('active');
    });
}