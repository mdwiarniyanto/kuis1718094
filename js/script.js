const baseUrl = "https://data.covid19.go.id/public/api/update.json";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getTotal() {
    title.innerHTML = "Data Kasus Covid"
    fetch(proxyurl+baseUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let ress = "";
                ress += `
                    <li class="collection-item">
                        Jumlah ODP : ${resJson.data.jumlah_odp}<br>
                        Jumlah PDP : ${resJson.data.jumlah_pdp}<br>
                        Total Spesimen : ${resJson.data.total_spesimen}<br>
                        Total Spesimen Negatif : ${resJson.data.total_spesimen_negatif}<br>
                        Jumlah Pasien Positif: ${resJson.update.total.jumlah_positif}<br>
                        Jumlah Pasien Dirawat: ${resJson.update.total.jumlah_dirawat}<br>
                        Jumlah Pasien Sembuh : ${resJson.update.total.jumlah_sembuh}<br>
                        Jumlah Pasien Meninggal: ${resJson.update.total.jumlah_meninggal}<br>
                    </li>`;
            contents.innerHTML = `<ul class="collection">${ress}</ul>`;
            const detil = document.querySelectorAll('.secondary-content');
        }).catch(err => {
            console.error(err);
        })
}

function getPenambahan() {
    title.innerHTML = `Data Update Harian`
    fetch(proxyurl+baseUrl)
        .then(response => response.json())
        .then(resJson => {
            let datas = "";
            resJson.update.harian.forEach(data => {
                datas += `
                    <li class="collection-item">
                        <span class="title"><b>Tanggal : ${data.key_as_string.slice(0,10)}</b></span><br>
                        Jumlah Pasien Meninggal : ${data.jumlah_meninggal.value}<br>
                        Jumlah Pasien Sembuh : ${data.jumlah_sembuh.value}<br>
                        Jumlah Pasien Positif: ${data.jumlah_positif.value}<br>
                        Jumlah Pasien Dirawat: ${data.jumlah_dirawat.value}<br>
                    </li>`
            });
            contents.innerHTML = `<ul class="collection">${datas}</ul>`;
            const detil = document.querySelectorAll('.secondary-content');
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "dataKeseluruhan":
            getTotal();
            break;
        case "dataPenambahanHarian":
            getPenambahan();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});