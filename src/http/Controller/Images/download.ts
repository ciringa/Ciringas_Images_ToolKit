import { FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import { z } from "zod";

export async function downloadImage(req: FastifyRequest, res: FastifyReply) {
  //Validação do corpo da requisição
  const { fileUrl } = z.object({
    fileUrl: z.string(),
  }).parse(req.body);
  //const fileUrl = "C:/programacao/Ciringas_Images_ToolKit/.temp/images/7b53e78f-517a-466f-9442-382eae6299e3.png"
  console.log(fileUrl)
  // Leitura do arquivo
  const file = readFileSync(fileUrl);
  // Definir cabeçalho correto do tipo de imagem
  res.header("Content-Type", "image/png"); // ou outro tipo de imagem, dependendo do arquivo
  res.send(file);
}


/*

router.get('/a/:projectLocator/:fileName', function (req, res) {    
    const img_url = base64_decode(req.params.projectLocator) + req.params.fileName;
    res.set({'Content-Type': 'image/png'});
    request.get(img_url).pipe(res)
});

*/