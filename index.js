const url = "https://restcountries.com/v2/all"
const queryLink = "https://restcountries.com/v2/name/"
const region = "https://restcountries.com/v3.1/region/"

const recieveData = async (url) => {
  const res = await fetch(url)
  try {
    const data = await res.json()
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
// render all
function onLoad(url) {
  // get data
  recieveData(url).then((data) => {
    // do stuff
    data.forEach((item) => {
      $(".grid").append(`<div class="country">
        <img src=${item.flags.png} alt="flag">
        <h2>${item.name}</h2>
        <p> <b>population:</b> ${item.population}</p>
        <p> <b>region:</b> ${item.region}</p>
        <p> <b>capital:</b> ${item.capital}</p>
      </div>`)
    })
  })
}
// on load
onLoad(url)
// search event
$("#word").on("keypress", (e) => {
  if (e.which === 13) {
    //search for a country
    const name = $("#word").val()
    const search = queryLink + name
    recieveData(search).then((data) => {
      $(".grid").hide()
      $(".filter").hide()
      $(".searchresult").show()
      $(".flag").append(`<img src=${data[0].flags.png} alt="">`)
      $(".info").prepend(`<h1>${data[0].name}</h1>`)
      $(".left").append(`<p> <b>Native Name:</b> ${data[0].name}</p>
      <p> <b>Population:</b> ${data[0].population}</p>
      <p> <b>Region:</b> ${data[0].region}</p>
      <p> <b>Sub Region:</b> ${data[0].subregion}</p>
      <p> <b>Capital:</b> ${data[0].capital}</p>`)
      $(".right").append(`<p><b>Top Level Domain:</b> ${data[0].topLevelDomain}</p>
      <p> <b>Currencies:</b> ${data[0].currencies[0].name}</p>
      <p> <b>Languages:</b> ${data[0].languages[0].name}</p>`)
      let borders = data[0].borders;
      if (borders === undefined) {
        $(".borders").append(`<button class="back">No Borders</button>`)
      } else {
        borders.forEach((border) => {
          $(".borders").append(`<button class="back">${border}</button>`)
        })
      }
    })
  }
})
//back button
$(".back").click(() => {
  $(".grid").show()
  $(".filter").show()
  $("#word").val("")
  $(".searchresult").hide()
  $(".flag").empty()
  $(".info").remove("h1:first")
  $(".left").empty()
  $(".right").empty()
  $(".borders").empty()
})
// filter Countries
$("a").on("click", (data) => {
  let query = region + data.target.text
  recieveData(query).then((data) => {
    // do stuff
    $(".grid").empty()
    data.forEach((item) => {
      $(".grid").append(`<div class="country">
        <img src=${item.flags.png} alt="flag">
        <h2>${item.name.common}</h2>
        <p> <b>population:</b> ${item.population}</p>
        <p> <b>region:</b> ${item.region}</p>
        <p> <b>capital:</b> ${item.capital}</p>
      </div>`)
    })
  })
})
$(".newbtn").click(() => {
  if ($("#chk")[0].checked) {
    $(":root").css("--light", "hsl(0, 0%, 98%)")
    $(":root").css("--very-light", "white")
    $(":root").css("--text", "black")
    $("#chk")[0].checked = false;
  } else {
    $(":root").css("--light", "hsl(207, 26%, 17%)")
    $(":root").css("--very-light", "hsl(209, 23%, 22%)")
    $(":root").css("--text", "white")
    $("#chk")[0].checked = true;
  }
})
