
import cv2 
  
   
# Create an object to read  
# from camera 
video = cv2.VideoCapture(0) 
   
# We need to check if camera 
# is opened previously or not 
if (video.isOpened() == False):  
    print("Error reading video file") 
  
# We need to set resolutions. 
# so, convert them from float to integer. 
frame_width = int(video.get(3)) 
frame_height = int(video.get(4)) 
   
size = (frame_width, frame_height) 

def applyEffectToFrame(frame,Effect):
    img = frame 
    Amount = 5;   
    match (Effect):   
        case 1: # grayscale image
            img = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
            pass;
        case 2: 
            img = cv2.GaussianBlur(img,(Amount,Amount),cv2.BORDER_DEFAULT)
            pass
        case 3:
            img = cv2.Canny(img,Amount*10,(Amount*10)+125)
    return img


# Below VideoWriter object will create 
# a frame of above defined The output  
# is stored in 'filename.avi' file. 
result = cv2.VideoWriter('filename.avi',  
                         cv2.VideoWriter_fourcc(*'MJPG'), 
                         10, size) 
    
while(True): 
    ret, frame = video.read() 
  
    if ret == True:  

        # Write the frame into the 
        # file 'filename.avi' 
        result.write(applyEffectToFrame(frame,1)) 
  
        # Display the frame 
        # saved in the file 
        cv2.imshow('Frame', frame) 
  
        # Press S on keyboard  
        # to stop the process 
        if cv2.waitKey(0): 
            break
    # Break the loop 
    else: 
        break
  
# When everything done, release  
# the video capture and video  
# write objects 
video.release() 
result.release() 
    
# Closes all the frames 
cv2.destroyAllWindows() 
   
print("The video was successfully saved") 