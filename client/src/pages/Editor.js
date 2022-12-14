import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  FormControlLabel,
  Grid,
  IconButton, LinearProgress,
  Switch,
  TextareaAutosize,
  TextField
} from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import '../styles/Editor.css'


export default function Editor() {
  const [charts, setCharts] = useState({v1: false, v3: false, v5: false, v6: false, v7: false, v8: false, v9: false})
  const [chartDescs, setChartDescs] = useState({
    v1Desc: null,
    v3Desc: null,
    v5Desc: null,
    v6Desc: null,
    v7Desc: null,
    v8Desc: null,
    v9Desc: null
  })

  const [stackedSelected, setStackedSelected] = useState(true)
  const [viewName, setViewName] = useState(`Näkymä-${(Math.random() * 1000000).toFixed(0)}`)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState("")
  const [posted, setPosted] = useState(false)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const base = "http://climatechangecharts.onrender.com/userview/"

  function copyToClipboard() {
    const copyText = document.getElementById("view-url");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);
    console.log(copyText.value);
  }

  function createView() {
    const newView = {
      name: viewName,
      stacked: stackedSelected,
      description: description,
      v1: charts.v1,
      v3: charts.v3,
      // v4: charts.v4,
      v5: charts.v5,
      v6: charts.v6,
      v7: charts.v7,
      v8: charts.v8,
      v9: charts.v9,
      v1description: chartDescs.v1Desc === "" ? null : chartDescs.v1Desc,
      v3description: chartDescs.v3Desc === "" ? null : chartDescs.v3Desc,
      // v4description: chartDescs.v4Desc === "" ? null : chartDescs.v4Desc,
      v5description: chartDescs.v5Desc === "" ? null : chartDescs.v5Desc,
      v6description: chartDescs.v6Desc === "" ? null : chartDescs.v6Desc,
      v7description: chartDescs.v7Desc === "" ? null : chartDescs.v7Desc,
      v8description: chartDescs.v8Desc === "" ? null : chartDescs.v8Desc,
      v9description: chartDescs.v9Desc === "" ? null : chartDescs.v9Desc,
    }

    console.log(newView);
    return newView
  }

  function postView() {
    axios.post("/view/create", createView(), {withCredentials: true})
      .then(response => {
        setUrl(response.data.split(" ")[0])
        setPosted(true)
      })
      .catch(error => {
        console.log(error);
      })
  }

  function check() {
    for (const value in charts) {
      if (charts[value]) return true
    }
    return false
  }

  return (
    <Grid>
      {!loaded && <LinearProgress color="secondary" sx={{height: 15}}/>}
      <Grid container item id="controls" sx={{mb: 6}} xs={12} direction={{xs: "column", md: "row"}} alignItems="center"
            justifyContent="center">
        <TextField
          sx={{width: 600}}
          disabled
          id="view-url"
          variant="outlined"
          value={base + url}
          size={"small"}
          InputProps={{
            endAdornment: <IconButton onClick={copyToClipboard} aria-label="copy"><ContentPasteIcon/></IconButton>
          }}
        />
        <FormControlLabel
          id="switch"
          control={<Switch onChange={event => setStackedSelected(!event.target.checked)}/>}
          label="Allekkain / Vierekkäin"/>
        <Button variant="outlined" onClick={postView} disabled={posted || !check()}>Luo näkymä</Button>
        <Link to={`/userview/${url}`} hidden={!posted}>
          <Button
            sx={{ml: 2}}
            variant="contained"
            color="success"
          >Näytä näkymä
          </Button>
        </Link>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item sx={{mb: 3}}>
          <TextField
            inputProps={{maxLength: 30}}
            value={viewName}
            sx={{width: 300}}
            id="view-name"
            name="name"
            label="Näkymän nimi, maks. 30 merkkiä"
            variant="outlined"
            size={"small"}
            autoFocus={true}
            onChange={(event) => setViewName(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6} direction={{xs: "column", md: "row"}} alignItems="center" justifyContent="center">
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v1}>
            <CardActionArea onClick={() => setCharts({...charts, v1: charts.v1 ? false : true})}>
              <CardHeader sx={{height: 150}}
                          title="Globaalit pintalämpötilavaihteluilmiöt tammikuusta 1850 lähtien sekä pohjoisen pallonpuoliskon lämpötilat 2000 vuodelta."/>
              <CardMedia component="img" image={require('../images/chart_v1.png')} alt="V1 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v1Desc: chartDescs.v1Desc = event.target.value})}
              hidden={!charts.v1}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v3}>
            <CardActionArea onClick={() => setCharts({...charts, v3: charts.v3 ? false : true})}>
              <CardHeader sx={{height: 150}}
                          title="Ilmakehän hiilidioksidipitoisuudet Mauna Loaalta alkaen vuodesta 1958 sekä antarktiset jäämittaukset ilmakehän hiilidioksidipitoisuuksista."/>
              <CardMedia component="img" image={require('../images/chart_v3.png')} alt="V3 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v3Desc: chartDescs.v3Desc = event.target.value})}
              hidden={!charts.v3}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v5}>
            <CardActionArea onClick={() => setCharts({...charts, v5: charts.v5 ? false : true})}>
              <CardHeader sx={{height: 150}}
                          title="Vostokin jäämittaukset hiilidioksidipitoisuuksista vuosilta 417160 - 2342 BP"/>
              <CardMedia component="img" image={require('../images/chart_v5.png')} alt="V5 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v5Desc: chartDescs.v5Desc = event.target.value})}
              hidden={!charts.v5}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v6}>
            <CardActionArea onClick={() => setCharts({...charts, v6: charts.v6 ? false : true})}>
              <CardHeader sx={{height: 150}}
                          title="Jäämittaukset 800k vuodelta yhdistettynä hiilidioksidimittauksiin."/>
              <CardMedia component="img" image={require('../images/chart_v6.png')} alt="V6 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v6Desc: chartDescs.v6Desc = event.target.value})}
              hidden={!charts.v6}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v7}>
            <CardActionArea onClick={() => setCharts({...charts, v7: charts.v7 ? false : true})}>
              <CardHeader sx={{height: 150}}
                          title="Globaalin lämpötilan evoluutio viimeisen kahden miljoonan vuoden aikana."/>
              <CardMedia component="img" image={require('../images/chart_v7.png')} alt="V7 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v7Desc: chartDescs.v7Desc = event.target.value})}
              hidden={!charts.v7}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450}} raised={charts.v8}>
            <CardActionArea onClick={() => setCharts({...charts, v8: charts.v8 ? false : true})}>
              <CardHeader sx={{height: 150}} title="Hiilidioksidipäästöt maittain."/>
              <CardMedia component="img" image={require('../images/chart_v8.png')} alt="V8 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v8Desc: chartDescs.v8Desc = event.target.value})}
              hidden={!charts.v8}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card id="chart-card" sx={{minWidth: {sm: 575, md: 875}, minHeight: 450, mb: 4}} raised={charts.v9}>
            <CardActionArea onClick={() => setCharts({...charts, v9: charts.v9 ? false : true})}>
              <CardHeader sx={{height: 150}} title="Hiilidioksidipäästöt sektoreittain."/>
              <CardMedia component="img" image={require('../images/chart_v9.png')} alt="V9 Chart"/>
            </CardActionArea>
            <TextareaAutosize
              id="text-area" maxRows={10}
              aria-label="empty textarea"
              placeholder="Jätä tyhjäksi käyttääksesi oletuskuvausta."
              onChange={event => setChartDescs({...chartDescs, v9Desc: chartDescs.v9Desc = event.target.value})}
              hidden={!charts.v9}
            />
          </Card>
        </Grid>
      </Grid>

    </Grid>
  )
}
