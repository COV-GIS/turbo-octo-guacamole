import '@esri/calcite-components/dist/calcite/calcite.css';
import './main.scss';

import esri = __esri;

// esri config
import esriConfig from '@arcgis/core/config';
esriConfig.portalUrl = 'https://gis.vernonia-or.gov/portal';
esriConfig.assetsPath = './arcgis';

// calcite
import { defineCustomElements } from '@esri/calcite-components/dist/loader';
defineCustomElements(window, { resourcesUrl: './calcite/assets' });

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';

const view = new MapView({
  center: [-123.188, 45.859],
  container: 'map-view',
  map: new Map({
    basemap: 'topo-vector',
    layers: [
      new FeatureLayer({
        url: 'https://gis.vernonia-or.gov/server/rest/services/UtilityMapping/LSL_Map_Service/MapServer/0',
        outFields: ['*'],
        popupTemplate: new PopupTemplate({
          content: (event: { graphic: esri.Graphic }): string => {
            const {
              graphic: {
                attributes: { lsl_location, lsl_water_system_material, lsl_customer_material },
              },
            } = event;
            return `
              <table>
                <tr>
                  <th>Foo</th>
                  <td>${lsl_location}</td>
                </tr>
                <tr>
                  <th>Bar</th>
                  <td>${lsl_water_system_material}</td>
                </tr>
                <tr>
                  <th>Baz</th>
                  <td>${lsl_customer_material}</td>
                </tr>
              </table>
            `;
          },
          title: '{lsl_site_id}',
        }),
      }),
    ],
  }),
  zoom: 16,
});

view.ui.remove('zoom');
