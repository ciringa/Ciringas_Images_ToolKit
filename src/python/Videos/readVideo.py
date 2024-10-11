import os
import sys
import uuid
import cv2

parameters = sys.argv[1:]

# Caminho do vídeo de entrada (no seu computador)
input_file = parameters[0]

# Caminho do vídeo de saída
output_file = parameters[1]

# Effect e scale do frame
scale = int(parameters[2])
effect = int(parameters[3])

if not os.path.exists(output_file):
    os.makedirs(output_file)
    

# Abrindo o vídeo de entrada
cap = cv2.VideoCapture(input_file)

# Verificando se o vídeo foi aberto corretamente
if not cap.isOpened():
    print("Erro ao abrir o arquivo de vídeo")
    exit()

# Obtendo a largura e altura dos frames
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)

# Definindo o codec e criando o objeto VideoWriter para o vídeo de saída
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter(os.path.join(output_file,str(uuid.uuid4())+".avi"), fourcc, fps, (frame_width, frame_height))

def applyEffectToFrame(frame,Effect):
    img = frame 
    Amount = 5;   
    match (Effect):   
        case 1: # grayscale image
            img = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
            img = cv2.cvtColor(img,cv2.COLOR_GRAY2BGR)
            pass;
        case 2: 
            img = cv2.GaussianBlur(img,(Amount,Amount),cv2.BORDER_DEFAULT)
            pass
        case 3:
            img = cv2.Canny(img,Amount*10,(Amount*10)+125)
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    return img

def rescaleFrame(frame,scale=0.5):
    width = int(frame.shape[1]*scale);
    height = int(frame.shape[0]*scale);
    dimensions = [width,height]

    return cv2.resize(frame,dimensions,interpolation=cv2.INTER_AREA)



# Processando o vídeo frame a frame
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Aqui você pode processar o frame se quiser
    # Exemplo: Convertendo para escala de cinza
    # frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = applyEffectToFrame(frame,effect);
    frame = rescaleFrame(frame,scale)
    # Escreve o frame no novo vídeo
    out.write(frame)

# Libera os objetos
cap.release()
out.release()

# retorna um resultado do python
print(cap);