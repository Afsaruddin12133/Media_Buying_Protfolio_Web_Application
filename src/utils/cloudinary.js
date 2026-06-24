export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'protfolio'); // User's unsigned upload preset

  try {
    // Make sure to use the exact cloud name provided by user
    const res = await fetch('https://api.cloudinary.com/v1_1/dvnmuxyfg/image/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
    }
    
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
};
