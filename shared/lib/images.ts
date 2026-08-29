const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=86&crop=faces&fp-x=.5&fp-y=.5&fp-z=1&ixlib=rb-4.1.0`;

const unsplashPhoto = (id: string) =>
  `https://unsplash.com/photos/${id}/download?force=true`;

export const coffeeImages = {
  roastery: unsplash("photo-1445116572660-236099ec97a0"),
  pourOver: unsplash("photo-1541167760496-1628856ab772"),
  cup: unsplash("photo-1495474472287-4d71bcdd2085"),
  bloom: unsplash("photo-1514432324607-a09d9b4aefdd"),
  cafe: unsplash("photo-1453614512568-c4024d13c247"),
  beans: unsplashPhoto("NcVh9SnrblM"),
  grinding: unsplashPhoto("3q3f1uDQk94"),
  preparing: unsplashPhoto("v1EM9yE2ykM"),
  serving: unsplashPhoto("veteUUqkLhg"),
  storyBeans: "/assets/story/beans.png",
  storyGrinding: "/assets/story/grinding.png",
  storyPreparing: "/assets/story/preparing.png",
  storyServing: "/assets/story/serving.png",
};
