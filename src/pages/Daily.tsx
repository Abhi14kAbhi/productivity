/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';
import Layout from '../components/Layout';
import {Context} from '../context/provider';
import {
  convertUnixToRegular,
  generateDailyLineChart,
  generateDailyPieChart,
} from '../utils';
import {apiData, listHours} from '../utils/constants';

const CheckProductivity = () => {
  const {
    state: {startTime, selectedDate},
    dispatch,
  } = useContext(Context);

  const [open, setOpen] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await axios.post(
        `${apiData.endPoint}${apiData.fetchOldTasks}`,
        {
          startTime: startTime,
          endTime: startTime + 86400,
        },
      );
      if (
        response.status === 200 &&
        response?.data?.body &&
        JSON.parse(response.data.body)?.data?.Items
      ) {
        let tasks = {};
        JSON.parse(response.data.body).data.Items.forEach(item => {
          const {hour} = convertUnixToRegular(item.startTime);
          tasks = {...tasks, [hour]: item};
        });
        const lineChart = generateDailyLineChart(tasks);
        const pieChart = generateDailyPieChart(tasks);
        setGraphData({lineChart, pieChart});
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchTasks();
  }, [startTime]);

  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  if (loading) {
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      }}>
      <ActivityIndicator />
    </View>;
  } else {
    return (
      <View style={{flex: 1}}>
        <Button onPress={() => setOpen(true)} style={{marginVertical: 15}}>
          {selectedDate.toDateString()}
        </Button>
        <DatePicker
          modal
          open={open}
          onConfirm={date => {
            setOpen(false);
            dispatch({type: 'SET_DATE_AND_TIME', payload: {date}});
          }}
          maximumDate={new Date()}
          mode="date"
          onCancel={() => setOpen(false)}
          date={selectedDate}
        />
        <ScrollView
          contentContainerStyle={{
            // width: '90%',
            alignItems: 'center',
            alignSelf: 'center',
            height: Dimensions.get('screen').height + 100,
          }}>
          {console.log(graphData.lineChart)}
          <View style={{height: 500}}>
            {graphData?.lineChart && (
              <LineChart
                style={{alignSelf: 'center'}}
                data={graphData.lineChart}
                width={Dimensions.get('screen').width * 0.9}
                height={300}
                chartConfig={chartConfig}
                withDots={false}
                withShadow
                withInnerLines={false}
                withOuterLines={false}
                bezier
              />
            )}

            {graphData?.pieChart && (
              <View style={{marginLeft: 20}}>
                <PieChart
                  data={graphData.pieChart}
                  width={Dimensions.get('screen').width}
                  height={300}
                  chartConfig={chartConfig}
                  accessor="count"
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default CheckProductivity;
