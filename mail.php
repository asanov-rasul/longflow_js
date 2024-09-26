<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// Валидация входных данных
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

if (empty($name) || strlen($name) < 2) {
    echo "Пожалуйста, заполните Имя корректно!";
    exit;
}

if (empty($phone) || strlen($phone) < 7) {
    echo "Пожалуйста, заполните Номер телефона корректно!";
    exit;
}

// Экранирование входных данных
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);


try {
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'longflowstudio@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
    $mail->Password = 'ubzgwbdgfoadzqer'; // Ваш пароль от почты с которой будут отправляться письма
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

    $mail->setFrom('longflowstudio@gmail.com'); // от кого будет уходить письмо?
    $mail->addAddress('longflowstudio@gmail.com');     // Кому будет уходить письмо 
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Заявка с сайта';
    $mail->Body    = 'Имя: ' .$name . '<br> Номер телефона: ' .$phone;
    $mail->AltBody = '';


    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>