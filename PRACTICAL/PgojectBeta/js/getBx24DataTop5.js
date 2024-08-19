const myObjectString2 = sessionStorage.getItem("mySessionbitrix24URL");

if (myObjectString2) {
    var myObject = JSON.parse(myObjectString2);

    const bitrix24URL = myObject;
    const methodList = `crm.deal.list`;
    const selectStr = `select[]=ID&select[]=TITLE&select[]=STAGE_ID&select[]=OPPORTUNITY&select[]=DATE_CREATE&select[]=CURRENCY_ID&select[]=COMPANY_ID&select[]=ASSIGNED_BY_ID&select[]=CLOSED`;
    const filterStr = `filter[!OPPORTUNITY]=0`;

    let responsUrl = `${bitrix24URL}/${methodList}?${selectStr}&${filterStr}&order[OPPORTUNITY]=DESC&start-1`;

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
} else {
    console.log(
        "Не введена ссылка в настройках или проблема с сессионной переменной"
    );
}


function displayData(deals) {
    let contentGrid = document.getElementById("Top5Deals");

    let headers = ["ID", "Create date", "Name", "Stage", "Amount", "Currency", "CompanyId", "ManagerId", "Closed"];
    for (i = 0; i < headers.length; i++) {
        let headerElement = document.createElement("div");
        headerElement.className = "grid-header";
        headerElement.textContent = headers[i];
        contentGrid.appendChild(headerElement);
    }

    // Добавление данных сделок
    for (j = 0; j < 6; j++) {
        let deal = deals[j];

        let dealData = [
            deal.ID,
            formatDate(deal.DATE_CREATE),
            deal.TITLE,
            deal.STAGE_ID,
            formatNumberWithSpaces(deal.OPPORTUNITY),
            deal.CURRENCY_ID,
            deal.COMPANY_ID,
            deal.ASSIGNED_BY_ID,
            deal.CLOSED,
        ];
        for (k = 0; k < dealData.length; k++) {
            let itemElement = document.createElement("div");
            itemElement.className = "grid-item";
            itemElement.textContent = dealData[k];
            contentGrid.appendChild(itemElement);
        }
    }
}
