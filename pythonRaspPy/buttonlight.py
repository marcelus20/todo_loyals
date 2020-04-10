# @author Taras Boreyko, Caue Duarte
import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import subprocess
import time
import req
import json


def button_callback(channel):
    GPIO.setwarnings(False)
    GPIO.setup(12,GPIO.OUT)
    print ("LED on")
    GPIO.output(12,GPIO.HIGH)
    #exec(open(req.py).read())
    text = subprocess.check_output(["sudo","nfc-poll"])
    index = text.find ("NFCID1")
    uuidPleaseWork = text[index + 9:index+23].replace(" ", "")
    req.create_card(uuidPleaseWork)
    response = req.create_transactions(uuidPleaseWork, 1)
    print(response["success"])
    if(len(response) == 2):
        i = 1
        while i < 5:
            GPIO.output(12,GPIO.LOW)
            time.sleep(0.3)
            GPIO.output(12,GPIO.HIGH)
            time.sleep(0.3)
            i += 1

    print ("LED off")
    GPIO.output(12,GPIO.LOW)
    #GPIO.cleanup()

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
GPIO.add_event_detect(10,GPIO.RISING,callback=button_callback) # Setup event on pin 10 rising edge
message = raw_input("Press enter to quit\n\n") # Run until someone presses enter
#GPIO.cleanup() # Clean up