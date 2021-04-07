window.onload = init;
function init(){
    const fullScreenControl = new ol.control.FullScreen();
    const mousePositionControl = new ol.control.MousePosition();
    const overViewMapControl = new ol.control.OverviewMap({
        collapsed: false,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })]
    });
    const zoomSliderControl = new ol.control.ZoomSlider();
    const zoomToExtentContro = new ol.control.ZoomToExtent();
    const ScaleLineControl = new ol.control.ScaleLine();
    const map = new ol.Map({
        view: new ol.View({
            center: [0,0],
            zoom: 3,
            maxZoom:6,
            minZoom:2,
            rotation: 0
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'js-map',
        KeyboardEventTargates: document,
        controls: ol.control.defaults().extend([
            fullScreenControl,
            mousePositionControl,
            overViewMapControl,
            ScaleLineControl,
            zoomSliderControl,
            zoomToExtentContro
        ])
    })
    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement
    })
    map.addOverlay(popup);
    map.on('click', function(e){
        //console.log(e);
        const clickedCoordinate =  e.coordinate; 
        popup.setPosition(undefined);
        popup.setPosition(clickedCoordinate);   
        popupContainerElement.innerHTML = clickedCoordinate;   
    })
    const drawInteraction =  new ol.interaction.Draw({
        type: 'Polygon'
    })
    map.addInteraction(drawInteraction);
    drawInteraction.on('drawend', function(e){
        let parser = new ol.format.GeoJSON();
        let drawnFeatures = parser.writeFeatures([e.feature]);
        console.log(drawnFeatures);
        //console.log(drawnFeatures.features[0].geometry.coordinates);
    })
}