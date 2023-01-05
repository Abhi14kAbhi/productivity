import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {
  ContributionGraph,
  LineChart,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Context} from '../context/provider';
import {
  convertUnixToRegular,
  convertDateTimeToUnix,
  generateMonthlyLineChartData,
  generateMonthlyProgressRing,
  generateMonthlyStackedBarChart,
  generateMonthlyHeatMap,
} from '../utils';
import {apiData} from '../utils/constants';

const Monthly = () => {
  const {
    state: {startTime, selectedDate},
    dispatch,
  } = useContext(Context);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdowns, setDropdowns] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  // const [daysInMonth, setDaysInMonth] = useState(0);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const firstDateOfMonth = new Date(dropdowns.year, dropdowns.month, 1);
      const lastDateOfMonth = new Date(dropdowns.year, dropdowns.month + 1, 1);

      const daysInMonth =
        (lastDateOfMonth - firstDateOfMonth) / (1000 * 3600 * 24);

      const response = await axios.post(
        `${apiData.endPoint}${apiData.fetchOldTasks}`,
        {
          startTime: convertDateTimeToUnix(firstDateOfMonth),
          endTime: convertDateTimeToUnix(lastDateOfMonth),
        },
      );

      if (
        response.status === 200 &&
        response?.data?.body &&
        JSON.parse(response.data.body)?.data?.Items
      ) {
        const {labels, data} = generateMonthlyLineChartData(
          daysInMonth,
          JSON.parse(response.data.body).data.Items,
        );
        const progressRingData = generateMonthlyProgressRing(
          JSON.parse(response.data.body).data.Items,
        );
        const stackedBarChartData = generateMonthlyStackedBarChart(
          daysInMonth,
          JSON.parse(response.data.body).data.Items,
        );
        const heatMapData = generateMonthlyHeatMap(
          daysInMonth,
          dropdowns.month,
          dropdowns.year,
          JSON.parse(response.data.body).data.Items,
        );
        setGraphData({
          lineChart: {
            labels,
            datasets: [
              {
                data,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          },
          progressRing: progressRingData,
          stackedBarChart: stackedBarChartData,
          heatMap: heatMapData,
        });
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchTasks();
  }, [dropdowns.month, dropdowns.year]);

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView>
      <Text>Monthly</Text>
      {graphData?.lineChart && (
        <View>
          <LineChart
            data={graphData.lineChart}
            width={400}
            height={600}
            chartConfig={chartConfig}
            hidePointsAtIndex={[
              1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22,
              23, 25, 26, 27, 28, 30,
            ]}
            withDots={false}
            withShadow
            withInnerLines={false}
            withOuterLines={false}
            bezier
          />
        </View>
      )}
      {graphData?.progressRing && (
        <View>
          <ProgressChart
            data={graphData.progressRing}
            width={400}
            height={400}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
          />
        </View>
      )}
      {graphData?.stackedBarChart && (
        <View>
          <StackedBarChart
            style={{height: Dimensions.get('screen').height - 300}}
            data={{
              ...graphData.stackedBarChart,
              barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
            }}
            width={400}
            height={300}
            chartConfig={{
              ...chartConfig,
              propsForLabels: {fill: 'transparent'},
            }}
            barPercentage={undefined}
          />
        </View>
      )}
      {/* {graphData?.heatMap && (
        <View>
          <ContributionGraph
            values={graphData.heatMap}
            endDate={new Date(dropdowns.year, dropdowns.month + 1, 0)}
            numDays={
              (new Date(dropdowns.year, dropdowns.month + 1, 0) -
                new Date(dropdowns.year, dropdowns.month, 1)) /
              (1000 * 3600 * 24)
            }
            width={400}
            height={300}
            chartConfig={chartConfig}
          />
        </View>
      )} */}
    </ScrollView>
  );
};

export default Monthly;
