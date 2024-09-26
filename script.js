document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.pop_up'),
          btnPopup = document.querySelector('.btn_pop_up'),
          closePopup = popup.querySelector('.close_pop_up'),
          forms = document.querySelectorAll('form'),
          burgerMenu = document.querySelector('.burger_menu'),
          burgerOpenIcon = document.querySelector('.burger_icon');



    // Слайдер

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });


    // Бургер меню

      burgerOpenIcon.addEventListener('click', () => {
        burgerMenu.classList.toggle('burger_show');
        burgerOpenIcon.classList.toggle('burger_open_icon');
        if (burgerMenu.classList.contains('burger_show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
      })


    // Попап формы
          
    function hidePopup() {
      popup.classList.add('hide');
      popup.classList.remove('show');
      document.body.style.overflowY = 'scroll';
    }

    btnPopup.addEventListener('click', () => {
        popup.classList.add('show');
        popup.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    })

    closePopup.addEventListener('click', hidePopup)

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    })



    // Модальное окно СТАТУСА оптравки форм

    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    const successfullyText = document.querySelector('.successfully_modal');
    const errorText = document.querySelector('.error_modal');
    const cssload = document.querySelector('.cssload-loader');


    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    span.onclick = function() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflowY = 'scroll';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.classList.add('hide');
          modal.classList.remove('show');
          document.body.style.overflowY = 'scroll';
        }
    }



    // Отправка форм

    forms.forEach(form => {
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nameInput = form.querySelector('.form_name'),
              emailInput = form.querySelector('.form_phone'),
              formStatus = form.querySelector('.form_status');


          // Функция для отображения статуса
          function showStatus(message) {
            formStatus.classList.remove('hide');
            formStatus.innerHTML = message;
          }

          // Проверка ввода
          if (!nameInput.value.trim() || nameInput.value.length < 2 || nameInput.value.length > 30) {
            showStatus('Пожалуйста заполните Имя корректно!');
          } else if (!emailInput.value.trim() || emailInput.value.length < 7 || emailInput.value.length > 30) {
            showStatus('Пожалуйста заполните Телефон корректно!');
          } else {
            formStatus.classList.add('hide');
            formStatus.innerHTML = '';
            showModal();


              let formData = new FormData(this);

              // Проверка, есть ли данные в форме
              if (Array.from(formData.entries()).some(([_, value]) => !value.trim())) {
                showStatus('Форма не должна быть пустой!');
                return; // Прекращаем выполнение
              }
      
              fetch("mail.php", {
                  method: "POST",
                  body: formData
              }).then(response => response.text())
                .then(data => {
                    if (data.trim() === "Message has been sent") {
                        nameInput.value = '';
                        emailInput.value = '';
                        popup.classList.add('hide');
                        popup.classList.remove('show');
                        successfullyText.classList.add('show');
                        cssload.classList.add('hide');
                        errorText.classList.remove('show');
                        setTimeout(() => {
                          modal.classList.remove('show');
                          modal.classList.add('hide');
                          document.body.style.overflowY = 'scroll';
                          successfullyText.classList.remove('show');
                          successfullyText.classList.remove('hide');
                          cssload.classList.remove('hide');
                          cssload.classList.remove('show');
                          errorText.classList.remove('hide');
                          errorText.classList.remove('show');
                        }, 3000)
                    } else {
                        cssload.classList.add('hide');
                        errorText.classList.add('show');
                        successfullyText.classList.remove('show');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                });    
              }
        })
    });




    // Навигация

    const navLi = document.querySelectorAll('.nav_item a');

    navLi.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
                  
              });
          }
            burgerMenu.classList.remove('burger_show');
            burgerOpenIcon.classList.remove('burger_open_icon');
            if (burgerMenu.classList.contains('burger_show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflowY = 'scroll';
            }
      });
    });
})