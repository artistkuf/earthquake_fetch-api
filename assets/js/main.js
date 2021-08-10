//Google Map Init
function initMap() {
  const myLatLng = { lat: 13.72239605544144, lng: 100.58075927279394 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 4,
    mapId: "8241b69ea1a50760",
  });

  //Data Layer Geojson
  map.data.loadGeoJson(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  );

  map.data.setStyle(function (feature) {
    const title = feature.getProperty("title");
    return {
      icon: {
        url: "/assets/images/icon__earthquake.png",
        scaleSize: new google.maps.Size(38, 31),
        labelOrigin: new google.maps.Point(15, -10),
      },
      title: title,
    };
  });
  map.data.addListener("click", function (event) {
    const map_popup = new google.maps.InfoWindow();
    const info_title = event.feature.getProperty("title");

    const data_time = event.feature.getProperty("updated");
    const info_time = new Date(data_time).toUTCString();

    map_popup.setContent(
      "<div style='width:150px; text-align: left;'>" +
        "<b>Name: </b>" +
        info_title +
        "</div>" +
        "<br/>" +
        "<div style='width:150px; text-align: left;'>" +
        "<b>Date/Time: </b>" +
        info_time +
        "</div>"
    );
    map_popup.setPosition(event.feature.getGeometry().get());
    map_popup.setOptions({
      pixelOffset: new google.maps.Size(0, -30),
    });
    map_popup.open(map);
  });

  //Primal Static Marker
  const primal_marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello Primal!",
    icon: {
      url: "/assets/images/logo__primal.png",
      scaleSize: new google.maps.Size(38, 31),
    },
  });
  const primal_content = "<h1>" + "Hello Primal" + "</h1>";
  const primal_popup = new google.maps.InfoWindow({
    content: primal_content,
  });
  primal_marker.addListener("click", () => {
    primal_popup.open({
      anchor: primal_marker,
      map,
      shouldFocus: false,
    });
  });
}

//Return Data from API
const eqURL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
axios
  .get(eqURL)
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error);
  });
