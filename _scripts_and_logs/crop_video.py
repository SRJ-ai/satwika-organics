from moviepy.editor import VideoFileClip
import sys
import os

try:
    input_path = "public/godmode-hero.mp4"
    output_path = "public/godmode-hero-cropped.mp4"
    
    print(f"Loading {input_path}...")
    clip = VideoFileClip(input_path)
    
    w, h = clip.size
    print(f"Original size: {w}x{h}")
    
    # We will crop 6% off the right side and bottom side to completely chop off the bottom right corner
    crop_x1 = 0
    crop_y1 = 0
    crop_x2 = int(w * 0.94)
    crop_y2 = int(h * 0.94)
    
    print(f"Cropping to: {crop_x2}x{crop_y2}")
    cropped_clip = clip.crop(x1=crop_x1, y1=crop_y1, x2=crop_x2, y2=crop_y2)
    
    print("Writing cropped video...")
    cropped_clip.write_videofile(
        output_path, 
        codec="libx264", 
        audio_codec="aac",
        logger=None # Suppress progress bar output in terminal
    )
    
    print("Done!")
    clip.close()
    cropped_clip.close()
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
