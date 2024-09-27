import os
import sys
import uuid
import cv2 as cv


parameters = sys.argv[1:]
input_path = parameters[0]
output_path = parameters[1]
effect = int(parameters[2])

file_name = str(uuid.uuid4())



if not os.path.exists(output_path):
    os.makedirs(output_path)
    
img = cv.imread(input_path)

if(effect>3 or effect<0):
    print("Error, invalid effect");

else:
    match (effect):   
        case 1: # grayscale image
            img = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
            pass;
        case 2: 
            img = cv.GaussianBlur(img,(5,5),cv.BORDER_DEFAULT)
            pass
        case 3:
            img = cv.Canny(img,100,125)

    cv.imwrite(os.path.join(output_path,file_name+".png"),img)
    pass