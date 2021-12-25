const cards = document.querySelectorAll(".card");
//intersection observer listens to changest on the entries that we pass inside observe
//this is a way to lazy load images!!
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      entry.isIntersecting ? observer.unobserve(entry.target) : null;
    });
    console.log(entries);
  },
  { threshold: 0.6, rootMargin: "10px" }
);
/* use threshold to define the % of intersection between root element and element
   use rootmargin to define a new margin for the root element!
   root property is wichever parent element that contains the observed element 

*/
/* Important properties: 
1 - isintersecting
2 - target
*/

cards.forEach((card) => observer.observe(card));

observer.observe(cards[0]);

//cards 0 will be observed!
const lastChild = document.querySelector(".card:last-child");

const lastChildObserver = new IntersectionObserver(
  (entry) => {
      
      
      if(entry[0].isIntersecting){
        console.log("intersecato!")

        let index = entry[0].target.dataset.number;
        lastChildObserver.unobserve(entry[0].target);
        create10Cards(index);
        lastChildObserver.observe(document.querySelector(".card:last-child"));
    }
    
  },
  { rootMargin: "70px" }
);

lastChildObserver.observe(lastChild);

function create10Cards(index = 0) {
  const container = document.querySelector(".card-container");
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const indexForCard = +index + i;
    card.dataset.number=""+indexForCard;
    observer.observe(card);
    card.textContent = "Card " + indexForCard;
    container.append(card);
  }
}
