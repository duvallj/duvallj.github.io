<html>
<head>
<title>RSA encrypter</title>
<meta charset='UTF-8'>
<meta width='device-width'>
<link rel="icon" type="image/vnd.microsoft.icon" href="../logo.ico">
<link rel="stylesheet" type="text/css" href="../Universal.css">
</head>
<body>
<div class='title'>
<img src='../name.jpg' class='left_pic flip'/>
<img src='../logo.png' class='right_pic' width='60' height = '60'/>
</div>
<div class='top'><h1>RSA in Python</h1></div>
<table style="width:100%"><tr><td valign='top' width=130px><div class='linkbar'>
  <a href='../'>Home</a>
  <a href='../?page=About.html'>About</a>
  <a href='../?page=Projects.html'>Projects</a>
  <a href='../?page=Downloads.html'>Downloads</a>
  <a href='../?page=Videos.html'>Videos</a>
  <a href='../?page=Comments.html'>Comments</a>
</div></td>
<td align='left'><div class='main'>
<?php
$conn = new mysqli( "localhost", "bob", "bobrulez", "access");
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO storedkeys (theM, theP, theD, pass) VALUES ('" ;
$sql .= $_POST["theM"] . "', '";
$sql .= $_POST["theP"] . "', '";
$sql .= $_POST["theD"] . "', '";
$sql .= $_POST["pass"] . "' );";

if ($conn->query($sql) === TRUE) {
    echo "All done! You can now use your password to encrypt and decrypt messages.";
} else {
    echo "ERROR: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
<br>
<br>
<a href="../?page=RSA%20Hashing.html">Go to encryption</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
