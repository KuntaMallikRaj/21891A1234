export const generateUniqueId = (product) => {
    return `${product.company}-${product.category}-${product.name}1`.replace(/\s+/g, '-').toLowerCase();
  };
  
  export const getRandomImage = () => {
    return `https://unsplash.com/photos/laptop-computer-beside-coffee-mug-j4uuKnN43_M`;
  };