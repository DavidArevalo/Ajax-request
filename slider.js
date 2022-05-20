let dataCards = [];
let degree = 10;
let numCards = 0;

$.ajax({
  url: "http://www.omdbapi.com/?i=tt3896198&apikey=3b0438dd&s=superman&page=3",
  type: "GET",
  dataType: "json",
  success: function (data) {
    dataCards = data.Search;
    numCards = dataCards.length;
    printCard(dataCards);
  },
  error: function (xhr, status) {
    alert("Ocurrio un error!");
  },
});

const calcDegree = (element) => {
  //TODO: hacer una funcion para que sea automatico el calculo del ángulo
  if (numCards > 5) degree = 5; //4
  if (numCards > 10) degree = 3;
  if (numCards > 13) degree = 2;
  if (numCards > 20) degree = 1;

  if (numCards % 2 === 0) {
    if (element % 2 === 0) return (numCards - (element - 1)) * degree;
    else return (numCards - element) * -degree;
  } else {
    if (element === numCards) return 0;
    if (element % 2 === 0) return (numCards - (element - 1)) * degree;
    else return (numCards - element) * -degree;
  }
};

const printCard = (dataCards) => {
  let cardContainer = document.getElementById("cardfan");
  if (numCards === 0) {
    cardContainer.innerHTML += `
    <p style="background: white">Cargando...</p>
    `;
  }
  dataCards.forEach((card, index) => {
    cardContainer.innerHTML += `
    <aside class="card" style="transform:rotate(${calcDegree(
      index + 1
    )}deg); background: white; ">
    <h4>
      ${card.Title}
    </h4>
    <img src="${card.Poster}" title="image" class="cardImage" />
    <p style="background: white">Año de estreno: ${card.Year}</p>
  </aside>
    `;
  });
};
