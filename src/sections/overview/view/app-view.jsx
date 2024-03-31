import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

/* import Iconify from 'src/components/iconify/iconify'; */

import axios from 'axios';
/* import AppNewsUpdate from '../app-news-update'; */
import { useState, useEffect, useContext } from 'react';

import { URL_API } from 'src/config/URL_API';
import { LoginContext } from 'src/context/LoginContext';

import { SwitchMode } from '../app-switch-mode';
import AppOrderTimeline from '../app-order-timeline';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
/* import AppCurrentVisits from '../app-current-visits';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates'; */

// ----------------------------------------------------------------------

export default function AppView() {
  const { infoUser } = useContext(LoginContext)
  const [measures, setMeasures] = useState({})

  useEffect(() => {
    if (measures) {
      const a = measures.measueresPerDay?.map((measure) => measure.countClients)
      console.log(a)
    }
  }, [measures, setMeasures])

  useEffect(() => {
    axios.post(`${URL_API()}/getMeasures`, null, {
      headers: {
        Authorization: `${infoUser.token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        setMeasures(prevState => ({
          ...prevState,
          ...res.data
        }));
      })
  }, [infoUser])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola de nuevo 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Interacciones"
            total={measures.global?.countMessages}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Clientes"
            total={measures.global?.countClients}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Comunicados"
            total={measures.global?.countConnecteds}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Costos"
            isMoneyValue
            total={measures.global?.countCosts}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Chatbot Métricas"
            subheader="(+43%) than last year <- comentario"
            chart={{
              labels: measures.measueresPerDay?.map((measure) => measure.date) || [],
              series: [
                {
                  name: 'Clientes nuevos',
                  type: 'column',
                  fill: 'solid',
                  data: measures.measueresPerDay?.map((measure) => measure.countClients) || [],
                },
                {
                  name: 'Comunicados',
                  type: 'area',
                  fill: 'gradient',
                  data: measures.measueresPerDay?.map((measure) => measure.countConnecteds) || [],
                },
                {
                  name: 'Costos',
                  type: 'line',
                  fill: 'solid',
                  data: measures.measueresPerDay?.map((measure) => measure.countCosts) || [],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            sx={{
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
            }}
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Inicializando repositorio',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={12} lg={3}>
          <SwitchMode sx={{
            boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.1)'
          }} />
        </Grid>
        
        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
