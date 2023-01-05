/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ActivityIndicator, Button, Provider} from 'react-native-paper';
import Drawer from '../components/Drawer';
import HourCard from '../components/HourCard';
import Layout from '../components/Layout';
import {Context} from '../context/provider';
import {convertDateTimeToUnix, convertUnixToRegular} from '../utils';
import {apiData, listHours} from '../utils/constants';

const LogHour = () => {
  const {
    state: {selectedDate, startTime},
    dispatch,
  } = useContext(Context);

  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [lastSentStatus, setLastSentStatus] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
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
        let newTasks = {};
        JSON.parse(response.data.body).data.Items.forEach(item => {
          const {hour} = convertUnixToRegular(item.startTime);
          newTasks = {...newTasks, [hour]: item};
        });
        setTasks(newTasks);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchTasks();
  }, [startTime]);

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const isEditable = time => {
    const date = new Date();

    if (
      selectedDate.getDate() < date.getDate() &&
      selectedDate.getMonth() <= date.getMonth() &&
      selectedDate.getFullYear() <= date.getFullYear()
    ) {
      return true;
    } else {
      if (time < date.getHours()) {
        return true;
      } else {
        return false;
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 10, width: '90%', alignSelf: 'center'}}>
        <HourCard
          time={item}
          status={tasks[item]?.status || undefined}
          comment={tasks[item]?.comment || undefined}
          onSubmit={onSubmit}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          isEditable={isEditable(item)}
        />
      </View>
    );
  };

  const onSubmit = async (comment: string, status: string, time: number) => {
    setLoading(true);
    const response = await axios.post(`${apiData.endPoint}${apiData.addTask}`, {
      comment,
      status,
      start: startTime + 3600 * time,
    });

    if (response && response.data && response.data.statusCode === 200) {
      const newTasks = {
        ...tasks,
        [time]: {
          comment,
          id: (startTime + 3600 * time).toString(),
          startTime: startTime + 3600 * time,
          status,
        },
      };
      setTasks({...newTasks});
      setLoading(false);
      setLastSentStatus(status);
      setDrawerVisible(true);
      setTimeout(() => {
        setDrawerVisible(false);
        setLastSentStatus(null);
      }, 3000);
    } else {
      // handle error
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && (
        <View style={{flex: 1}}>
          <Layout title="Log hours" />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} />
          </View>
        </View>
      )}
      {!loading && !error && (
        <Provider>
          <Drawer
            status={lastSentStatus}
            visible={drawerVisible}
            hideModal={hideDrawer}
          />

          <View style={{flex: 1}}>
            <Layout title="Log hours" />

            <Button style={{marginVertical: 15}} onPress={() => setOpen(true)}>
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
            <View
              style={{
                flex: 1,
                width: '100%',
                alignSelf: 'center',
              }}>
              <FlatList
                data={listHours}
                renderItem={renderItem}
                keyExtractor={item => item}
              />
            </View>
          </View>
        </Provider>
      )}
    </SafeAreaView>
  );
};

export default LogHour;
