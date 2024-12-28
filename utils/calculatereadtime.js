module.exports = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };
  