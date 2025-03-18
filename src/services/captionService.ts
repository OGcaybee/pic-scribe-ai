
// Mocking the API call for now since we don't have a backend
// In a real app, this would call an actual API endpoint

export const generateCaption = async (imageFile: File): Promise<string> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random caption from a predefined list for demo purposes
      const captions = [
        "A beautiful landscape with mountains and a lake at sunset",
        "A person enjoying a cup of coffee at a cozy café",
        "A fluffy cat sleeping on a comfortable sofa",
        "A group of friends laughing and having fun at a beach party",
        "A vintage car parked on a street in a historic city center",
        "A delicious plate of pasta with fresh ingredients",
        "A vibrant city skyline at night with colorful lights",
        "A serene garden with blooming flowers and butterflies",
        "A happy dog running through a green park",
        "An artistic shot of architecture with interesting geometric patterns",
      ];
      
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      resolve(randomCaption);
    }, 1500); // 1.5 second delay to simulate API call
  });
};
