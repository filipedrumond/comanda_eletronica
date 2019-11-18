<?php	
$erro="";
$nome_arquivo="";
$idPrato = $_POST['idPrato']; // recebe por post o id do prato

if (isset($_FILES['inputThumbnail'])){
	//Recuperando informações do arquivo
	$nome_arquivo = $_FILES['inputThumbnail']['name'];
	$tmp = $_FILES['inputThumbnail']['tmp_name'];
	$extensoes = array(".png",".jpeg",".jpg");
	$caminho = "img/prato-$idPrato/";
	
	// verifica se há imagens para o id do prato enviado via POST
	if(!is_dir($caminho)){
		mkdir("$caminho/", 0777);
	}

	//Verifica se a extensão é permitida
	if (!in_array(strtolower(strrchr($nome_arquivo, ".")), $extensoes)){
		$erro = 'Extensão do arquivo enviado inválida!';
	}
	
	//Se não houver erro
	
	if ($erro==""){
		// Gerando um nome aleatório para a imagem
		$nomeAleatorio = md5(uniqid()) . strrchr($nome_arquivo, ".");
		
		//Movendo arquivo para servidor
		
		if (!move_uploaded_file($tmp,$caminho.$nome_arquivo)){
			$erro = 'Não foi possível anexar o arquivo!';
		}else{
			$result = [
				"nomeAleatorio" => $nomeAleatorio,
				"idPrato" => $idPrato
			];
			echo json_encode($result);
			die;
		}
	
	}
	echo json_encode(["erro"=>$erro]);
	die;
}
echo json_encode(["erro"=>"Campos Invalidos"]);
die;