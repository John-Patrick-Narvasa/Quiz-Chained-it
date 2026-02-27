
import pathlib as pl
import os
import sys

import pytesseract
from PIL import Image
import easyocr
from transformers import pipeline




def extract_text_tesseract(image_path):
    # Load the image
    image = Image.open(image_path)
    # Extract text using pytesseract
    text = pytesseract.image_to_string(image)
    return text


def extract_text_easyocr(image_path):
    reader = easyocr.Reader(['en'])
    results = reader.readtext(image_path)
    text = " ".join([result[1] for result in results])
    return text


# Attempt to locate Tesseract executable in common Windows paths
possible_paths = [
    r'C:\Program Files\Tesseract-OCR\tesseract.exe',
    r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
    os.path.expandvars(r'%LOCALAPPDATA%\Tesseract-OCR\tesseract.exe'),
    os.path.expandvars(r'%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe')
]

for path in possible_paths:
    if os.path.exists(path):
        pytesseract.pytesseract.tesseract_cmd = path
        print(f"Tesseract found at: {path}")
        break
else:
    print("Error: Tesseract-OCR executable not found. Please install it from https://github.com/UB-Mannheim/tesseract/wiki")
    sys.exit(1)

# Verify Tesseract is accessible
print(f"Tesseract Version: {pytesseract.get_tesseract_version()}")

# Define the image path
pdf_path = pl.Path.cwd() / r'C:\Users\ACER\Desktop\Code_Learning_sessions\Quiz-Chain\sample.png'

# OCR the image
image = Image.open(pdf_path)
text = pytesseract.image_to_string(image)

print(text)