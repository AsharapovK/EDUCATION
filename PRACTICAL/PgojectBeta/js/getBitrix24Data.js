const bitrix24URL = `https://media-led.bitrix24.ru/rest/117/asvfxcowc1veec19`;
const methodList = `crm.deal.list`;
const selectStr = `select[]=ID&select[]=TITLE&select[]=STAGE_ID&select[]=OPPORTUNITY&select[]=DATE_CREATE`;
const filterStr = `filter[!OPPORTUNITY]=0`;

let responsUrl = `${bitrix24URL}/${methodList}?${selectStr}&${filterStr}&order[ID]=DESC&start-1`;

let codeResponse = responsUrl.replace(/[<>]/g, function (match) {
  return encodeURIComponent(match);
});

fetch(codeResponse, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayData(data.result);
  });

function displayData(deals) {
  let contentGrid = document.getElementById("contentGrid");

  let headers = ["ID", "Create date", "Name", "Stage", "Amount"];
  for (i = 0; i < headers.length; i++) {
    let headerElement = document.createElement("div");
    headerElement.className = "grid-header";
    headerElement.textContent = headers[i];
    contentGrid.appendChild(headerElement);
  }

  var localObjectDashbord = {
    countDeals: 0,
    countWons: 0,
    countLose: 0,
    countInWorks: 0,
    sumDeals: 0,
    sumWons: 0,
    sumLose: 0,
    sumInWorks: 0,
  };
  // Добавление данных сделок
  for (j = 0; j < deals.length; j++) {
    let deal = deals[j];

    localObjectDashbord.countDeals = deals.length;
    localObjectDashbord.sumDeals += +deal.OPPORTUNITY;
    if (deal.STAGE_ID.indexOf("WON") !== -1) {
      localObjectDashbord.countWons += 1;
      localObjectDashbord.sumWons += +deal.OPPORTUNITY;
    }
    if (deal.STAGE_ID.indexOf("LOSE") !== -1) {
      localObjectDashbord.countLose += 1;
      localObjectDashbord.sumLose += +deal.OPPORTUNITY;
    }
    localObjectDashbord.countInWorks =
      localObjectDashbord.countDeals -
      localObjectDashbord.countWons -
      localObjectDashbord.countLose;
    localObjectDashbord.sumInWorks =
      localObjectDashbord.sumDeals -
      localObjectDashbord.sumWons -
      localObjectDashbord.sumLose;

    let dealData = [
      deal.ID,
      formatDate(deal.DATE_CREATE),
      deal.TITLE,
      deal.STAGE_ID,
      formatNumberWithSpaces(deal.OPPORTUNITY),
    ];
    for (k = 0; k < dealData.length; k++) {
      let itemElement = document.createElement("div");
      itemElement.className = "grid-item";
      itemElement.textContent = dealData[k];
      contentGrid.appendChild(itemElement);
    }
  }

  // Парсим и сохраняем строку в сессионной переменной
  const myObjectString = JSON.stringify(localObjectDashbord);
  sessionStorage.setItem("mySessionVar", myObjectString);

  console.log(`Итого сумма: ${myObjectString}`);
}