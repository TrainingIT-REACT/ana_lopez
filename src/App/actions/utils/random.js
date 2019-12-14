export const getRandomRecommendations = (musicList, numOfRecommendations) => {
  const numberOfItems = musicList.length;
  if (numberOfItems !== 0) {
    let recommendations = [];
    while (recommendations.length < numOfRecommendations) {
      const recommendationIndex = Math.floor(Math.random() * numberOfItems);
      const musicItem = musicList[recommendationIndex];
      if (!recommendations.find(recommendation => recommendation.id === musicItem.id)) {
        recommendations.push(musicItem);
      }
    }
    return recommendations;
  }

  return [];
};
