# importa o objeto cv2 
import os
import sys
import uuid
import cv2 as cv
parameters = sys.argv[1:]
ImageUrl = parameters[0]
Outurl = parameters[1]
scale = float(parameters[2])

file_name = str(uuid.uuid4())

if not os.path.exists(Outurl):
    os.makedirs(Outurl)
    

## aumenta ou diminui o tamanho da imagem
def rescaleFrame(frame,scale):
    width = int(frame.shape[1]*scale);
    height = int(frame.shape[0]*scale);
    dimensions = [width,height]
    return cv.resize(frame,dimensions,interpolation=cv.INTER_AREA)


# lê a imagem 
img = cv.imread(ImageUrl)
#cria uma janela aonde mostra a imagem
img = rescaleFrame(img,scale)

cv.imwrite(os.path.join(Outurl,file_name+".png"),img)
print("Image Resized")