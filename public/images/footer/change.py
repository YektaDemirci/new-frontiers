from PIL import Image

def process_image_pil(input_path, output_path, threshold=128, red_offset=30):
    # Open image and ensure it is in RGBA mode
    img = Image.open(input_path).convert("RGBA")
    pixels = img.getdata()
    
    new_pixels = []
    
    for r, g, b, a in pixels:
        # 1. Calculate average brightness
        # Formula: (R + G + B) / 3
        brightness = (r + g + b) / 3
        
        # 2. Check if the pixel is "reddish"
        # We define red as the Red channel being significantly 
        # higher than both Green and Blue.
        is_reddish = (r > g + red_offset) and (r > b + red_offset)
        
        # 3. Logic: If it's dark AND NOT reddish, turn it white
        if brightness < threshold and not is_reddish:
            new_pixels.append((255, 255, 255, a)) # White with original alpha
        else:
            new_pixels.append((r, g, b, a)) # Keep original pixel
            
    # Apply the new data and save
    img.putdata(new_pixels)
    img.save(output_path)
    print(f"File saved successfully to {output_path}")

# Run the function
process_image_pil("favicon3.png", "fav.png", threshold=130, red_offset=30)
