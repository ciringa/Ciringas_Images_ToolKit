from rembg import remove
import easygui
from PIL import Image

##"C:/Users/thier/Downloads/"
inputPath = easygui.fileopenbox(title="select the image file")
outputPath = easygui.filesavebox(title="select where the file will go")

input = Image.open(inputPath)
output = remove(input)
output.save(outputPath+".png")

