<?php
use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST["company"]) && isset($_POST["message"])){
    
    $company = $_POST["company"];
    $message = $_POST["message"];
    $to = "mednis.rihards@gmail.com";
    $subject = "Message from rihards.mednis.com";

    $body = "";
    $body .= "From: ".$company. "<br>";
    $body .= "Subject: ".$subject. "<br>";
    $body .= "Message: ".$message. "<br>";

    //GETTING CREDENTIALS FROM .ini FILE
    // $credentials = parse_ini_file("./mail_credentials.ini");

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    $mail -> isSMTP();
    $mail -> Host = "smtp.gmail.com";
    $mail -> SMTPAuth = true;

    //GETTING CREDENTIALS FROM PARSED .ini FILE
    // $mail -> Username = $credentials['username'];
    // $mail -> Password = $credentials['password'];

    // OR STRAIGT CREDENTIALS STORING HERE...
    $mail -> Username = 'username';
    $mail -> Password = 'password';

    $mail -> Port = 465;
    $mail -> SMTPSecure = "ssl";

    $mail -> isHTML(true);
    $mail -> setFrom("mednisrihardscom@gmail.com", $company);
    $mail -> addAddress("mednis.rihards@gmail.com");
    $mail -> Subject = "Mail from rihardsmednis.com";
    $mail -> Body = $body;

    if ($mail -> send()){
        $response = "ok";
    } else {
        $response = "ERROR SENDING MAIL:  " . $mail -> ErrorInfo;
    }
}

echo $response;