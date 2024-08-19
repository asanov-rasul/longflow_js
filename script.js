document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.pop_up'),
          btnPopup = document.querySelector('.btn_pop_up'),
          closePopup = popup.querySelector('.close_pop_up'),
          forms = document.querySelectorAll('form'),
          burgerMenu = document.querySelector('.burger_menu'),
          burgerOpenIcon = document.querySelector('.burger_icon');


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


      burgerOpenIcon.addEventListener('click', () => {
        burgerMenu.classList.toggle('burger_show');
        burgerOpenIcon.classList.toggle('burger_open_icon');
        if (burgerMenu.classList.contains('burger_show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
      })





      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
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

      forms.forEach(form => {
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          
          const nameInput = form.querySelector('.form_name'),
                emailInput = form.querySelector('.form_phone'),
                formStatus = form.querySelector('.form_status');


            if (!nameInput.value.trim()) {
                formStatus.innerHTML = 'Пожалуйста заполните Имя корректно!'
            } else if (!emailInput.value.trim() || emailInput.value.length < 7) {
              formStatus.innerHTML = 'Пожалуйста заполните Телефон корректно!'
            } else if (nameInput.value.trim() && emailInput.value.trim() && emailInput.value.length > 7) {
                formStatus.innerHTML = ''
                showModal();

                var formData = new FormData(this);
        
                fetch("mail.php", {
                    method: "POST",
                    body: formData
                }).then(response => response.text())
                  .then(data => {
                      console.log(data);
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
                          errorText.classList.add('show');
                         successfullyText.classList.remove('show');
                      }
                  }).catch(error => {
                      console.error('Error:', error);
                  });    
                }
          })
      });
})