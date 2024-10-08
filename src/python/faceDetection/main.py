import cv2 as cv
import sys
import os 
parameters = sys.argv[1:]

input_path = parameters[0];
output_path = parameters[1];
option = int(parameters[2]);

haar_cascade = cv.CascadeClassifier("haars_cascade.xml");

if not os.path.exists(output_path):
    os.makedirs(output_path)

image = cv.imread(input_path);

gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
faces_rec = haar_cascade.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=1);

for(x,y,w,h) in faces_rec:
    cv.rectangle(image,(x,y),(x+w,y+h),(255,255,255),2)


cv.imwrite(image)
print(len(faces_rec))