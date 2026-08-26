const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=86&crop=faces&fp-x=.5&fp-y=.5&fp-z=1&ixlib=rb-4.1.0`;

export const coffeeImages = {
  roastery: unsplash("photo-1445116572660-236099ec97a0"),
  pourOver: unsplash("photo-1541167760496-1628856ab772"),
  beans: unsplash("photo-1447933601403-0c6688de566e"),
  cup: unsplash("photo-1495474472287-4d71bcdd2085"),
  bloom: unsplash("photo-1514432324607-a09d9b4aefdd"),
  cafe: unsplash("photo-1453614512568-c4024d13c247"),
};
