<?php
if(isset($_GET['page'])){
  $file = $_GET['page'];
  if(file_exists($file) == false){
    echo file_get_contents('error.html');
  }
  else{
    $doc = file_get_contents($file);
    $b1 = file_get_contents('base1.html');
    $b2 = file_get_contents('base4.html');
    $b3 = file_get_contents('base3.html');
    $b4 = file_get_contents('base2.html');
    $file = explode('/', $file)[count(explode('/', $file))-1];
    echo $b1.substr($file, 0, -5).$b2.substr($file, 0, -5).$b3.$doc.$b4;
  }
  $conn = new mysqli('localhost', 'bob', 'bobrulez', 'access');
  if ($conn->connect_error){
    die();
  }
  $sql = "INSERT INTO views (ip_addr, file_got) VALUES ('";
  $sql .= $_SERVER['REMOTE_ADDR'] . "', '";
  $sql .= $_GET['page'] . "')";
  if (!($conn->query($sql) === TRUE)){
    echo "Something happened.";
  }
  $conn->close();
} elseif(isset($_GET['file'])){
  $file = $_GET['file'];
  if (file_exists($file) && !($file == '_base.php' || $file == 'loader.php' || $file == 'comments.php')) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    $conn = new mysqli('localhost', 'bob', 'bobrulez', 'access');
    if ($conn->connect_error){
      die();
    }
    $sql = "INSERT INTO views (ip_addr, file_got) VALUES ('";
    $sql .= $_SERVER['REMOTE_ADDR'] . "', '";
    $sql .= $_GET['file'] . "')";
    if (!($conn->query($sql) === TRUE)){
      echo "Something happened.";
    }
    $conn->close();
    exit;
  } else{
    echo file_get_contents('error.html');
  }
} else{
  echo file_get_contents('home.html');
  $conn = new mysqli('localhost', 'bob', 'bobrulez', 'access');
  if ($conn->connect_error){
    die();
  }
  $sql = "INSERT INTO views (ip_addr, file_got) VALUES ('" . $_SERVER['REMOTE_ADDR'] . "', 'home.html')";
  if (!($conn->query($sql) === TRUE)){
    echo "Something happened.";
  }
  $conn->close();
}
?>
