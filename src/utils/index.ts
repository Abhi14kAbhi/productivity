import {listHours} from './constants';

export const convert12HourFormat = (number: number) => {
  return number > 12 && number < 24
    ? `${(number - 12).toString()}:00 PM`
    : number === 12
    ? `${number}:00 PM`
    : number === 24
    ? `${(number - 12).toString()}:00 AM`
    : `${number}:00 AM`;
};

export const convertUnixToRegular = (unix: number) => {
  const date = new Date(unix * 1000);
  return {
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

export const convertDateTimeToUnix = (date: Date) => {
  const unixTimeStamp = Math.floor(date.getTime() / 1000);
  return unixTimeStamp;
};

export const generateDailyLineChart = (
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  return {
    labels: listHours,
    datasets: [
      {
        data: listHours.map(item =>
          tasks[item] ? (tasks[item]?.status === 'PRODUCTIVE' ? 1 : 0) : 0.5,
        ),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Produtivity'],
  };
};

export const generateDailyPieChart = (
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  const pieChart = [
    {
      name: 'Productive',
      count: 0,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Unprodutive',
      count: 0,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Unknown',
      count: 0,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  listHours.forEach(item => {
    if (tasks[item]) {
      if (tasks[item].status === 'PRODUCTIVE') {
        pieChart[0].count += 1;
      } else {
        pieChart[1].count += 1;
      }
    } else {
      pieChart[2].count += 1;
    }
  });
  return pieChart;
};

export const generateMonthlyLineChartData = (
  days: number,
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  const data = Array(days).fill(0);
  const labels = data.map((v, index) => {
    return index + 1;
  });
  tasks.forEach(item => {
    if (item.status === 'PRODUCTIVE' && item.startTime) {
      const {day} = convertUnixToRegular(item.startTime);
      data[day - 1] = data[day - 1] + 1;
    }
  });
  return {
    labels,
    data,
  };
};

export const generateMonthlyProgressRing = (
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  const data = {
    labels: ['PEE', 'UNPEE'],
    data: [0, 0],
  };
  tasks.forEach(item => {
    if (item.status === 'PRODUCTIVE') {
      data.data[0] = data.data[0] + 1;
    } else {
      data.data[1] = data.data[1] + 1;
    }
  });
  const total = data.data[0] + data.data[1];
  data.data[0] = data.data[0] / total;
  data.data[1] = data.data[1] / total;
  return data;
};

export const generateMonthlyStackedBarChart = (
  daysInMonth: number,
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  const daysInZero = Array(daysInMonth).fill(0);
  const data = Array(daysInMonth).fill([0, 0, 0]);
  const labels = daysInZero.map((v, index) => {
    if (index + 1 === 1 || (index + 1) % 5 === 0) {
      return (index + 1).toString();
    } else {
      return '';
    }
  });
  const legend = ['Productive', 'Unproductive', 'Unknown'];
  tasks.forEach(item => {
    const {day} = convertUnixToRegular(item.startTime);
    if (item.status === 'PRODUCTIVE') {
      data[day - 1] = [
        data[day - 1][0] + 1,
        data[day - 1][1],
        data[day - 1][2],
      ];
    } else {
      data[day - 1] = [
        data[day - 1][0],
        data[day - 1][1] + 1,
        data[day - 1][2],
      ];
    }
  });
  const totalTasksPossibleDaily = 17;
  data.forEach((v, index) => {
    data[index][2] =
      totalTasksPossibleDaily - (data[index][0] + data[index][1]);
  });
  return {
    labels,
    legend,
    data,
  };
};

export const generateMonthlyHeatMap = (
  daysInMonth: number,
  month: number,
  year: number,
  tasks: {
    comment: string;
    id: string;
    startTime: number;
    status: 'PRODUCTIVE' | 'UNPRODUCTIVE';
  }[],
) => {
  const daysArray = Array(daysInMonth).fill(0);
  const data = daysArray.map((v, index) => {
    return {date: `${year}-${month}-${index + 1}`, count: 0};
  });
  tasks.forEach(item => {
    if (item.status === 'PRODUCTIVE') {
      const {day} = convertUnixToRegular(item.startTime);
      data[day - 1].count += 1;
    }
  });
  return data;
};
