import React from 'react';
import { connect } from 'react-redux';
import { Container, Paper, Tabs, Tab} from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';
import PreOrderedBooksView from '../components/PreOrderedBooksView';
import OrderedBooksView from '../components/OrderedBooksView';
import GainedBooksView from '../components/GainedBooksView';



function TabPanel(props) {
    const { children, value, index} = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabPanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}


function UserBooksPage(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Container>
            <Paper>
                <Tabs
                   value={value}
                   onChange={handleChange}
                   centered>
                    <Tab label="Отобранные" id="tab-0" aria-controls="tabPanel-0"/>
                    <Tab label="Заказанные"id="tab-1" aria-controls="tabPanel-1"/>
                    <Tab label="На руках" id="tab-2" aria-controls="tabPanel-2"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <PreOrderedBooksView />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OrderedBooksView />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <GainedBooksView />
                </TabPanel>
            </Paper>
        </Container>
    );
}



export default UserBooksPage;