import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart, Tooltip} from 'chart.js/auto';

import 'chartjs-adapter-luxon';
import Context from "@mui/base/TabsUnstyled/TabsContext";

function V7() {
  const [v6Data, setV6Data] = useState([])
  const [v7Data, setV7Data] = useState([])
  const [v10Data, setV10Data] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("/v6")
      .then(response => {
        setV6Data(response.data.map(six => {
          return {id: six.id, gasAge: six.gasAge, co2: six.co2}
        }))
      }).catch(err => {
      console.log(err);
    })

    axios.get("/v7")
      .then(response => {
        setV7Data(response.data.map(seven => {
          return {id: seven.id, yearBp: seven.yearBp, tempChange: seven.tempChange}
        }))
      }).catch(err => {
      console.log(err);
    })

    axios.get("/v10")
      .then(response => {
        setV10Data(response.data.map(evo => {
          return {id: evo.id, year: evo.year, co2: 0, event: evo.event}
        }))
      }).catch(err => {
      console.log(err);
    })

    setLoaded(true)

  }, [])


  const data = {
    datasets: [
      {
        label: "CO2",
        data: v6Data,
        borderColor: "rgb(255, 102, 0)",
        backgroundColor: "rgba(255, 102, 0, 0.3)",
        parsing: {
          xAxisKey: "gasAge",
          yAxisKey: "co2",
        },
        pointRadius: 2,
        yAxisID: 'y1',
      },

      {
        label: "Temperature",
        data: v7Data,
        borderColor: "rgb(204, 0, 204)",
        backgroundColor: "rgba(204, 0, 204, 0.5)",
        parsing: {
          xAxisKey: "yearBp",
          yAxisKey: "tempChange",
        },
        pointRadius: 2,
      },

      {
        label: "Event",
        data: v10Data,
        borderColor: "rgb(102, 0, 51)",
        backgroundColor: "rgba(102, 0, 51, 0.5)",
        showLine: false,
        parsing: {
          xAxisKey: "year",
          yAxisKey: "co2",
        },
        pointRadius: 6,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: false,
        text: "Ice core 800k year composite study CO2 measurements and Evolution of global temperature over the past two million years and Human evolution and activities",
      },
      tooltip: {
        callbacks: {

          beforeLabel: function (context) {
            var seeker = context.datasetIndex;
            if (seeker === 2) {
              var event = context.dataset.label;
              return "Event:";
            }
          },


          label: function (context) {
            var seeker = context.datasetIndex;
            var content;
            let label = context.dataset.label;
            if (seeker === 2) {

              var chunks = [];
              var str = context.raw.event;
              str = str.match(/.{1,75}(?:\s|$)/g);

              str.forEach(mdmg => {
                chunks.push(mdmg)
              });

              content = chunks;

              return content;

            } else {
              content = context.parsed.y;

              return label + ": " + content;

            }

          }

        }
      }
    },

    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: "years",
          position: "bottom"
        }
      },

      y: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: "temperature"
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: "CO2 ppm"
        }
      },

      y2: {
        display: false,
      }
    }
  };

  return (
    <div>
      {loaded && <Line options={options} data={data}/>}
    </div>
  );
}

export default V7;